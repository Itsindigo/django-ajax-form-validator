from django.views.generic import FormView
from django.http import JsonResponse


class AjaxFormView(FormView):

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance with the passed
        POST variables and then checked for validity.
        """
        form = self.get_form()
        valid = form.is_valid()

        if not request.is_ajax():
            return super(AjaxFormView, self).post(request, *args, **kwargs)

        if not valid:
            return self.form_invalid_ajax(form)

        return self.form_valid_ajax(form)

    def form_valid_ajax(self, form):
        """
        Return an empty errors object for Ajax requests - indicating valid form.
        """
        return JsonResponse({'errors': {}}, status=200)

    def form_invalid_ajax(self, form):
        """
        If we receive an ajax request, parse error codes into messages and return as a JSON object.
        """
        data = {'errors': {}}

        for key, value in form.errors.items():
            data['errors'][key] = [error for error in value]

        return JsonResponse(data, status=400)
