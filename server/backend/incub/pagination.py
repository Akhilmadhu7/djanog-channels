
from typing import List
from . models import BookingSlot, Booking, Account
from . serializers import BookingSerializer, BookingSlotSerializer, AccountSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView



class UserPaginationSize(PageNumberPagination):
    page_size = 10


class UserPagination(ListAPIView):

    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    pagination_class = UserPaginationSize

    
class SlotPaginationSize(PageNumberPagination):
    page_size = 15 


class SlotPagination(ListAPIView):          #class to show for all the slots
    
    queryset = BookingSlot.objects.all()
    serializer_class = BookingSlotSerializer
    pagination_class = SlotPaginationSize


class ApplicationsPaginationSize(PageNumberPagination):
    page_size = 7    


class ApplicationsPagination(ListAPIView):          #class to show for the total application form list

    queryset = Booking.objects.filter(pending = True)
    serializer_class = BookingSerializer
    pagination_class = ApplicationsPaginationSize



class ApprovedPaginationSize(PageNumberPagination):
    page_size = 7    


class ApprovedPagination(ListAPIView):              #class to show for the total approved form list

    queryset = Booking.objects.filter(approved = True)
    serializer_class = BookingSerializer
    pagination_class = ApprovedPaginationSize



class DeclinedPaginationsize(PageNumberPagination):
    page_size = 7

class DeclinedListPagination(ListAPIView):          #class to show for the total declined form list

    queryset = Booking.objects.filter(declined = True)
    serializer_class = BookingSerializer
    pagination_class = DeclinedPaginationsize
