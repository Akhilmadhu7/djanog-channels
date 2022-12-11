from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='home'),
    # path('<str:username>',views.chatPage, name='chat'),
    path('caaa/<str:username>',views.chat_data,name='chat_data'),
    path('chat-user',views.chat_users,name='chat_users')
]
