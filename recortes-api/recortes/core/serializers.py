
from rest_framework import serializers


class RecorteSerializer(serializers.Serializer):
    id = serializers.CharField()
    numeracao_unica = serializers.CharField()
    recorte = serializers.CharField()
    data_publicacao = serializers.CharField()
