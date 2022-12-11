
from django.shortcuts import render
from . models import Account, Booking,BookingSlot
from . serializers import AccountSerializer,BookingSerializer,BookingSlotSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from django.db.models import Count

# Create your views here.







class Register(APIView):

    def post(self,request):
        print('ddd',request.data)
        account = AccountSerializer(data=request.data)
        data = {}
        if account.is_valid():
            account.save()
            data['Data'] = account.data
            data['response'] = 'Registered'
        else:
            data = account.errors
        return Response(data,status=status.HTTP_201_CREATED)     




class BookingForm(APIView):
    
    def post(self,request):
        print('helooooooo')
        print(request.data['full_name'])
        booking = BookingSerializer(data=request.data)
        data = {}
        if booking.is_valid():
            booking.save()
            data['response']='registered'
        else:
            data=booking.errors
        return Response(data)        


# class BookingList(APIView):

    
#     def get(self,request):
#         print(request.user)
#         bookings = Booking.objects.filter(pending=True)
#         serializer = BookingSerializer(bookings,many=True)
#         return Response(serializer.data)


class BookingApproved(APIView):

    def post(self,request,id):
        try:
            booking = Booking.objects.get(id=id)
            if booking.pending == True:
                booking.pending = False
                booking.approved = True
                booking.save()  
        except :
            pass    
        return Response(status=status.HTTP_200_OK)    

class ApprovedList(APIView):

    def get(self,request):
        booking = Booking.objects.filter(approved = True)
        serializer = BookingSerializer(booking,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class BookingDeclined(APIView):

    def post(self,request,id):
        try:
            booking = Booking.objects.get(id=id)
            if booking.pending == True:
                booking.pending = False
                booking.declined = True
                booking.save()
        except:
            pass
        return Response(status=status.HTTP_200_OK) 


# class DeclinedList(APIView):

#     def get(self,request):
#         booking = Booking.objects.filter(declined = True)
#         serializer = BookingSerializer(booking, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


class ViewBookingDetails(APIView):

    def get(self,request,id):
        try:
            booking = Booking.objects.get(id=id)
            serializer = BookingSerializer(booking)
        except:
            pass
        if serializer:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)    



class CreateSlot(APIView):

    def post(self,request): 
        try:
            last_slot =   BookingSlot.objects.last()            # taking the last object form the 'Booking slot'    
            slot_no=last_slot.room+1                     # increasing the room number to get the next number to create a new room
            newslot = BookingSlot(                        # creating a room with the new room number
             room = slot_no
            )
        except:
            newslot = BookingSlot.objects.create(room = 1)      #if no previous room objects , this except will create a 
                                                                # new room with number '1'
        newslot.save()
        slot  = BookingSlot.objects.all()           #collecting all the objects to serialize to pass to the frontend
        serializer = BookingSlotSerializer(slot,many=True)
      
        return Response(serializer.data)


# class  SlotBookings(APIView):

#     def get(self,request):
        
#         slot = BookingSlot.objects.all()

#         serializer = BookingSlotSerializer(slot,many=True)

#         return Response(serializer.data, status=status.HTTP_200_OK)


class BookSlot(APIView):

   def post(self,request):
        
        a=request.data['book']
        b=request.data['slot']
        slot = BookingSlot.objects.get(id=a)
        booking = Booking.objects.get(id=b)
        booking.allotted = True
        booking.save()
        slot.booking = booking
        slot.is_booked=True
        slot.save()
        
        return Response(status=status.HTTP_200_OK)

    

class DashboardView(APIView):

    def get(self,request):
        user = Account.objects.count()
        # users = AccountSerializer(user,many=True)
        pending = Booking.objects.filter(pending = True, approved = False).count()
        approved = Booking.objects.filter(approved = True).count()
        declined = Booking.objects.filter(declined = True).count()
        allotted = Booking.objects.filter(allotted = True).count()
        bookings = Booking.objects.count()

        data = {
            'user':user,
            'pending':pending,
            'approved':approved,
            'allotted':allotted,
            'declinded':declined,
            'bookings':bookings
        }
        return Response(data)

