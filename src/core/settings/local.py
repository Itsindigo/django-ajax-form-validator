from django.core.exceptions import ImproperlyConfigured
from .base import *

SECRET_KEY = 'asiubfaiusbfuiasbfuibsaufasiufbas'

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1'
]


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': '',
        'PORT': '',
    }
}

if not DATABASES['default']['NAME']:
    raise ImproperlyConfigured('Database Name not set, please configure.')
