from django.shortcuts import render
from django.contrib.auth import get_user_model
from incub.models import Account
from . models import ChatModel
from rest_framework.decorators import api_view
from . serializers import ChatSerializer
from rest_framework.response import Response
from incub.serializers import AccountSerializer

User = get_user_model()

# Create your views here.


def index(request):
    # users = User.objects.exclude(username=request.user.username)
    users = Account.objects.exclude(username=request.user.username)
    return render(request, 'index.html', context={'users':users})

def chatPage(request,username):
    print('usernameusernasme')
    user_obj = Account.objects.get(username=username)
    print('reciever',user_obj.id,'sender',request.user.id)
    users = Account.objects.exclude(username = request.user.username)
    if request.user.id > user_obj.id:
        thread_name = f'chat_{request.user.id}-{user_obj.id}'
    else:
        thread_name = f'chat_{user_obj.id}-{request.user.id}'  
    message_obj = ChatModel.objects.filter(thread_name=thread_name)    
    print('message_obj',message_obj)
    return render(request, 'main_chat.html',context={'users':users,'user':user_obj,
    'messages':message_obj
    })   
    # return render(request,'main_chat.html' )
    

@api_view(['GET'])
def chat_data(request,username):
    user_obj = Account.objects.get(username=username)
    print('reciever',user_obj.id,'sender',request.user)
    users = Account.objects.exclude(username = request.user.username)
    if request.user.id > user_obj.id:
        thread_name = f'chat_{request.user.id}-{user_obj.id}'
    else:
        thread_name = f'chat_{user_obj.id}-{request.user.id}'  
    message_obj = ChatModel.objects.filter(thread_name=thread_name)    
    chat_ser = ChatSerializer(message_obj,many=True)
    print('lll',user_obj.username,request.user.id)
    # print('message_obj',chat_ser.data) 
    return Response(chat_ser.data) 
    # return Response('data data')



@api_view(['GET'])
def chat_users(request):
    print('req')
    print('ussss',request.user)
    users = Account.objects.exclude(username = request.user.username)
    chat_list = []
    chat_user = ChatModel.objects.filter(thread_name=request.user.id).first()
    for user in users:
        print('jejejjeej',chat_user.sender)
        if chat_user.sender in users:
            print('sender',chat_user.sender)
            list(chat_list.append(user))

    user_ser = AccountSerializer(chat_list, many=True)
    return Response(user_ser.data)
    # return Response('response')
