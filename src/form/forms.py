from django.forms import forms
from django.forms import fields
from django.forms import TextInput, HiddenInput


class UserDetailsForm(forms.Form):

    COUNTRIES = [
        ('UNITED_KINGDOM', 'United Kingdom'),
        ('USA', 'U.S'),
        ('FRANCE', 'France'),
        ('GERMANY', 'Germany'),
        ('SPAIN', 'Spain')
    ]

    first_name = fields.CharField(
        max_length=100,
        min_length=5
    )

    last_name = fields.CharField(
        max_length=100,
        min_length=5
    )

    email = fields.EmailField()

    country = fields.ChoiceField(
        choices=COUNTRIES
    )

    availability_date = fields.DateField(
        input_formats=['%m/%d/%Y'],
        widget=TextInput(attrs={'placeholder': 'MM/DD/YYYY'})
    )

    def clean(self):
        super(UserDetailsForm, self).clean()
