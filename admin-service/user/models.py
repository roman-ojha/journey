# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.utils import timezone

# NOTE: I have updated some of the properties of the fields so don't try to auto generate model in the this file


class User(models.Model):
    email = models.TextField(unique=True)
    number = models.BigIntegerField(unique=True)
    f_name = models.TextField()
    l_name = models.TextField()
    password = models.TextField()
    photo_url = models.TextField(blank=True, null=True)
    gender = models.TextField()  # This field type is a guess.
    is_verified = models.BooleanField(default=False)
    verification_token = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    salt = models.TextField()

    def save(self, *args, **kwargs):
        self.updated_at = timezone.now()
        super().save(*args, **kwargs)

    class Meta:
        # managed = False
        db_table = 'User'
