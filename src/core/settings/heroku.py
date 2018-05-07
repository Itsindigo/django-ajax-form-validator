from .base import *


# Configure Django App for Heroku.
import django_heroku
django_heroku.settings(locals())
