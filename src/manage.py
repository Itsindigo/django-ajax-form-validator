#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault('DEPLOY_ENV', 'local')
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.%s' % os.environ['DEPLOY_ENV'])

    from django.core.management import execute_from_command_line  # noqa
    execute_from_command_line(sys.argv)
