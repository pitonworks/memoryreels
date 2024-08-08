from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import MediaFile
from .serializers import MediaFileSerializer

@api_view(['POST'])
def upload_file(request):
    if 'file' not in request.FILES:
        return Response({'error': 'No file uploaded.'}, status=status.HTTP_400_BAD_REQUEST)

    file = request.FILES['file']
    name = request.data.get('name', '')

    serializer = MediaFileSerializer(data={'file': file, 'name': name})
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'File uploaded successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
