
from datetime import datetime
from rest_framework import viewsets
from rest_framework.response import Response
from orator.exceptions.orm import ModelNotFound
from .serializers import RecorteSerializer, RecorteDetailSerializer
from .models import RecorteDb


class RecorteViewSet(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        recorte = RecorteDb.find_or_fail(pk)
        serializer = RecorteDetailSerializer(instance=recorte)
        return Response(serializer.data)

    def list(self, request):
        recortes = []
        resultado = []

        try:
            # Parâmetros URL.
            size = int(request.query_params.get('size', 100))
            offset = int(request.query_params.get('offset', 0))
            nup = request.query_params.get('nup')
            q = request.query_params.get('q')
            t = request.query_params.get('t')

            # Realiza a consulta pelo número do processo.
            if nup:
                resultado = RecorteDb.where('numeracao_unica', '=', nup).offset(offset).limit(size).get()

            # Realiza a consulta pelas palavras-chave informadas.
            if q:
                palavras = '&'.join([f'({w})' for w in q.split('-')])
                resultado = RecorteDb.where('recorte', 'similar to', f'%({palavras})%').offset(offset).limit(size).get()

            # Realiza a consulta pela data de publicação.
            if t:
                data_formatada = datetime.strptime(t, '%d%m%Y').strftime('%Y-%m-%d')
                resultado = RecorteDb.where('data_publicacao', '=', data_formatada).offset(offset).limit(size).get()

            recortes.extend(resultado)
            serializer = RecorteSerializer(instance=recortes, many=True)

            return Response(serializer.data)
        except ModelNotFound:
            return Response(status=404, data=dict(detail='Processo não localizado'))
