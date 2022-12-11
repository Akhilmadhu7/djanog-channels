
from rest_framework import serializers
from . models import Account, Booking, BookingSlot




class AccountSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input':'password'},write_only = True)

    class Meta:
        model = Account
        fields = ['id','first_name','last_name','email','username','password','password2']

        extra_kwargs = {'password':{'write_only':True}}

    def save(self):

        register = Account(
            username = self.validated_data['username'],
            email = self.validated_data['email'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name']
        )   

        password = self.validated_data['password']
        password2 = self.validated_data['password2'] 

        if password != password2:
            raise serializers.ValidationError({'password':'Password does not match'})
        
        register.set_password(password)
        register.save()
        return register




class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = '__all__'

    pending = serializers.BooleanField(default=True)    



class BookingSlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookingSlot
        fields = '__all__'

    is_booked = serializers.BooleanField(default=False) 
    

   
