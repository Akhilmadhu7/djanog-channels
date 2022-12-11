from django.urls import  path
from . import views
from . import pagination

urlpatterns = [

    path('register',views.Register.as_view(),name='register'),
    path('booking',views.BookingForm.as_view(),name='booking'),
    # path('bookinglist',views.BookingList.as_view(),name='bookedlist'),
    path('approved/<int:id>',views.BookingApproved.as_view(),name='bookingapproved'),
    path('approvedlist',views.ApprovedList.as_view(),name='approvedlist'),
    path('decline/<int:id>',views.BookingDeclined.as_view(),name='declined'),
    # path('declinedlist',views.DeclinedList.as_view(),name='declinedlist'),
    path('bookingdetails/<int:id>',views.ViewBookingDetails.as_view(),name='bookingdetails'),
    path('slotbooking',views.CreateSlot.as_view(),name='create'),
    # path('slots',views.SlotBookings.as_view(),name='slots'),
    path('bookslot',views.BookSlot.as_view(),name='addslot'),
    
    path('dashview',views.DashboardView.as_view(),name='dashview'),

    path('userlist',pagination.UserPagination.as_view(),name='uselist'),
    path('slotpagination',pagination.SlotPagination.as_view(),name='slotpagination'),
    path('declinedlist',pagination.DeclinedListPagination.as_view(),name='declinedpagination'),
    path('approvedpagination',pagination.ApprovedPagination.as_view(),name='approvedpagination'),
    path('applicationlist',pagination.ApplicationsPagination.as_view(),name='applicationlist')
]