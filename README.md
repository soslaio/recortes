# recortes
Aplicação de consulta a recortes jurídicos, incluindo API e cliente React.

Para colocar o serviço no ar, é recomendado possuir o Git e o Docker instalado na máquina local (localhost). Com esses requisitos, pode-se começar clonando este repositório, através dos seguintes comandos:

    $ git clone https://github.com/soslaio/recortes.git
    $ cd recortes-stack

No arquivo `stack.yml`, edite o parâmetro `environment` para refletir os dados do banco de dados PostgreSQL, como host, usuário e senha.

Após isso, levante o servidor através do comando:

    $ sudo docker-compose -f stack.yml up

O cliente pode, então, ser acessado através do endereço `http://localhost:81`.

A api pode ser acessada no endereço `http://localhost:8001`.

O usuário para acesso é `admin` e a senha é `pass`.

Enjoy!
