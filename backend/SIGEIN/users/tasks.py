from django.utils import timezone
from django.conf import settings
from django.core.mail import send_mail
from user_agents import parse
from celery import shared_task


@shared_task(ignore_result=True)
def send_login_email_task(login_email, user_agent, user_ip):
        
        if(settings.SEND_EMAIL_AFTER_LOGIN):

            user_agent = parse(user_agent)
            OS = user_agent.os.family
            OS_version = user_agent.os.version_string
            browser = user_agent.browser.family
            browser_version = user_agent.browser.version_string
            is_mobile = user_agent.is_mobile
            is_PC = user_agent.is_pc

            ip_address, is_routable = user_ip
            login_time = timezone.localtime(timezone.now()).strftime('%A, %b %d %Y, %H:%M')

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
                recipient_list= [login_email],
                fail_silently=True,     
            )
