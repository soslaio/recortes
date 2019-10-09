
FROM python:3.6-slim-buster

# Atualizações do sistema.
RUN apt-get -y update
RUN apt-get -y upgrade

# Copia os arquivos necessários para a construção da imagem.
COPY recortes-api/recortes /opt/recortes/app
COPY recortes-api/requirements.txt /opt/recortes/requirements.txt

# Instala os módulos python requeridos para a aplicação.
WORKDIR /opt/recortes/
RUN pip install -r requirements.txt

WORKDIR /opt/recortes/app
RUN python manage.py migrate
RUN echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'pass')" | python manage.py shell
