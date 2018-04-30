from core.mixins import AjaxFormView
from .forms import UserDetailsForm


class Index(AjaxFormView):
    form_class = UserDetailsForm
    template_name = 'form/index.html'
