from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import MediaFile
from .serializers import MediaFileSerializer

def determine_media_type(file):
    # Basit bir örnekle dosya uzantısına göre tür belirleme
    if file.name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        return 'image'
    elif file.name.lower().endswith(('.mp4', '.mov', '.avi')):
        return 'video'
    return 'unknown'

@api_view(['POST'])
def upload_file(request):
    if 'file' not in request.FILES:
        return Response({'error': 'No file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']
    media_type = determine_media_type(file)

    serializer = MediaFileSerializer(data={'file': file, 'media_type': media_type})
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'File uploaded successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
