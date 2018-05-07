import dj_database_url
import environ
from .base import *

# Load operating system environment variables and then prepare to use them
env = environ.Env()

# Read in local .env file variables
local_env_file = '{base_dir}/.env'.format(base_dir=str(PROJECT_ROOT))
env.read_env(local_env_file)

STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

SECRET_KEY = env.str('SECRET_KEY')
DEBUG = env.str('DEBUG', default=True)
DATABASES = {
    'default': dj_database_url.config(
        default=env.str('DATABASE_URL')
    )
}

# Configure Django App for Heroku.
import django_heroku
django_heroku.settings(locals())
