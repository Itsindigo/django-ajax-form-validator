import os

from django.core.wsgi import get_wsgi_application

__all__ = ['application']


os.environ.setdefault('DEPLOY_ENV', 'local')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.%s' % os.environ['DEPLOY_ENV'])

application = get_wsgi_application()

# This needs to be called after we bootstrapped the application
# otherwise the settings wouldn't be configured
from django.conf import settings
