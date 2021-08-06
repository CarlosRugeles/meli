# Reto de mutantes
## Descripción
El objetivo de este proyecto es encontrar de acuerdo a una cadena de DNA dada si es un
gen mutante o no. Para poder dar respuesta a esto se debe seguir el siguiente criterio: 
- Si hay más de una secuencia de cuatro letras iguales, de forma oblicua, horizontal o vertical se dice
  que es un gen mutante de lo contrario es humano.
<br>
<br>
![img.png](rules-sample.png)

# Instalación

## Requerimientos
Para la implementación es necesario tener instalado Node.js, Docker y un servidor
Apache.

Para iniciar la instalación de este servicio es necesario ejecutar en la raíz del
proyecto `npm install`.

##Ejecución

Para la inicialización del servicio se debe ejecutar `npm start` desde la raíz
del proyecto. 

>Nota: La API quedará corriendo en el puerto 3000 para cambiarlo se debe modificar
> el archivo `server.js`

## Mejorar el rendimiento del API
Para mejorar el rendimiento del API y pueda soportar peticiones de 100 a 1000000 
se sugiere una solución de balanceador de cargas en conjunto con dos contenedores.

Es necesario construir dos contenedores con diferentes puertos asignados a los 
servicios creados en cada uno por lo tanto se deberá modificar `server.js` antes 
de construir cualquier contenedor en conjunto con `Dockerfile` dónde se debe cambiar
`EXPOSE XXXX` por el puerto deseado.

Para generar los contenedores se debe ejecutar `docker build -t NOMBRE_DOCKER .`
<br>
Una vez los contenedores han sido creados se deben levantar dos o más instancias con 
`docker run -p PORT:PORT -d DOCKER_IMAGE_NAME` utilizando diferentes puertos para 
cada uno de estas.
<br>

Por último se debe agregar la configuración de balancer al sitio web que para 
propósito de este proyecto fue creado en Apache de la siguiente manera: 
<br>
```
<Proxy balancer://melibalancer>
    BalancerMember http://127.0.0.1:3000 route=1
    BalancerMember http://127.0.0.1:3001 route=2
    ProxySet lbmethod=bytraffic
</Proxy>

ProxyRequests Off
ProxyPreserveHost On
ProxyPass "/" "balancer://melibalancer/"
ProxyPassReverse "/" "balancer://melibalancer/"
```

# API

El proyecto está corriendo sobre el endpoint **http://104.198.156.226/mutants/** y para su ejecución se 
debe hacer una petición **POST** en formato **JSON** con la cadena **DNA** que se va a verificar. El endpoint
retornará en caso de ser humano el código `403 Forbidden` y un `200 Http-ok` en caso de ser mutante.
##Ejemplo de petición POST `/mutants/`
![img.png](postman-sample.png)

Para ver las estadísticas de los genes mutantes y humanos encontrados se pueden visualizar a través
del siguiente endpoint **http://104.198.156.226/mutants/** mediante una petición **`GET`** la cual retornará
un conteo de los genes diferentes encontrados de cada uno (mutante, humano) y una **ratio** entre ellos.

## Ejemplo de petición GET `/stats`

![img.png](postman-stats-sample.png)
<br>

>Nota: Para ejecutar las peticiones usando Postman puedes entrar a la
> [documentación de la API](https://documenter.getpostman.com/view/16798673/TzshHQZz).
