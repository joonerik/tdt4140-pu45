# Generated by Django 3.1.6 on 2021-02-15 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dinner', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dinner',
            old_name='contact',
            new_name='email',
        ),
        migrations.AddField(
            model_name='dinner',
            name='contains_gluten',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='dinner',
            name='contains_lactose',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='dinner',
            name='contains_nut',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='dinner',
            name='contains_shellfish',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='dinner',
            name='other_allergens',
            field=models.CharField(default='ikke oppgitt', max_length=30),
        ),
        migrations.AddField(
            model_name='dinner',
            name='phone',
            field=models.CharField(default='ikke oppgitt', max_length=15),
        ),
    ]
