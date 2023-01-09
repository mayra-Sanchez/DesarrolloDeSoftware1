from django.utils import timezone
from django.dispatch import Signal
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
from django.core.mail import send_mail
from user_agents import parse
from ipware import get_client_ip
#from .views import MyTokenObtainPairView


login_successful_signal = Signal()

@receiver(login_successful_signal)
def send_login_email(sender, request, user, **kwargs):
        
        if(settings.SEND_EMAIL_AFTER_LOGIN):

            ua = request.META.get('HTTP_USER_AGENT')
            user_agent = parse(ua)
            OS = user_agent.os.family
            OS_version = user_agent.os.version_string
            browser = user_agent.browser.family
            browser_version = user_agent.browser.version_string
            is_mobile = user_agent.is_mobile
            is_PC = user_agent.is_pc

            ip_address, is_routable = get_client_ip(request)
            login_time = timezone.localtime(timezone.now()).strftime('%A, %b %d, %Y %H:%M')

            subject = "New Login in your SIGEIN account"
            email_body = f"You logged in from ip:{ip_address}\n \
                            At: {login_time}\n \
                            Browser: {browser} {browser_version}\n \
                            OS: {OS} {OS_version}\n \
                            Divice: {'mobile' if is_mobile else ('PC' if is_PC else 'unknown') }\n \
                            "
            
            # this function returns 1 if the email was successfully sent, false otherwise
            send_mail(
                subject= subject,
                message= email_body,
                from_email= settings.EMAIL_HOST_USER,
                recipient_list= [user.email],
                fail_silently=True,
            # headers={'Date': formatdate()}
            )
