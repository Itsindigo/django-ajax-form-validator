from django.conf.urls import url
from django.contrib import admin
from form.views import Index as FormIndex


urlpatterns = [
    url(r'^$', FormIndex.as_view(), name='index'),
    url(r'^admin/', admin.site.urls),
]


admin.site.site_header = 'Django Ajax Form Validator'
admin.site.site_title = 'Django Ajax Form Validator'
