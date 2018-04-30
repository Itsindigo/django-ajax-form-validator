from django.forms import forms
from django.forms import fields


class UserDetailsForm(forms.Form):

    COUNTRIES = [
        ('ENGLAND', 'England'),
        ('USA', 'U.S'),
        ('FRANCE', 'France'),
        ('GERMANY', 'Germany'),
        ('Spain', 'Spain')
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
        input_formats=['%m/%d/%y']
    )
