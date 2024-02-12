```sh
FROM python:3

RUN git clone https://github.com/mjg59/python-broadlink.git

WORKDIR /python-broadlink

RUN python -m pip install pycrypto	
RUN python -m pip install netaddr

RUN wget https://bootstrap.pypa.io/get-pip.py

RUN python setup.py install

CMD ["./cli/broadlink-discover"]
```