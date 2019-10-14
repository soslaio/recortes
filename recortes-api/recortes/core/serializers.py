
from rest_framework import serializers


class RecorteDetailSerializer(serializers.Serializer):
    id = serializers.CharField()
    data_criacao = serializers.CharField()
    data_criacao_formatada = serializers.SerializerMethodField()
    data_modificacao = serializers.CharField()
    data_modificacao_formatada = serializers.SerializerMethodField()
    numeracao_unica = serializers.CharField()
    recorte = serializers.CharField()
    data_publicacao = serializers.CharField()
    data_publicacao_formatada = serializers.SerializerMethodField()
    codigo_diario = serializers.CharField()
    caderno = serializers.CharField()
    novo_recorte = serializers.BooleanField()
    paginas_diario = serializers.CharField()
    nup_invalido = serializers.CharField()
    nup_invalido_msg = serializers.CharField()

    def get_data_criacao_formatada(self, obj):
        return obj.data_criacao.strftime('%d/%m/%Y')

    def get_data_modificacao_formatada(self, obj):
        return obj.data_modificacao.strftime('%d/%m/%Y')

    def get_data_publicacao_formatada(self, obj):
        return obj.data_publicacao.strftime('%d/%m/%Y')


class RecorteSerializer(serializers.Serializer):
    id = serializers.CharField()
    numeracao_unica = serializers.CharField()
    recorte = serializers.CharField()
    data_publicacao = serializers.CharField()
