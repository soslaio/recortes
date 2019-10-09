
from orator import Model, DatabaseManager
from django.conf import settings

db = DatabaseManager(settings.ORATOR_CONFIG)
Model.set_connection_resolver(db)


class RecorteDb(Model):
    __table__ = 'recortes_recorte'
