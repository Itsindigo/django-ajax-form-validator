from core.mixins import AjaxFormView
from .forms import UserDetailsForm


class Index(AjaxFormView):
    form_class = UserDetailsForm
    template_name = 'form/index.html'

    def get_context_data(self, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        context['success'] = self.request.GET.get('success', None)
        return context

    def get_success_url(self):
        return ".?success=1"
