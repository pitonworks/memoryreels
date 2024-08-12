from django.contrib import admin
from .models import MediaFile

@admin.register(MediaFile)
class MediaFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'media_type', 'uploaded_at')
    list_filter = ('media_type', 'uploaded_at')
    search_fields = ('file',)
