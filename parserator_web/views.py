import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.exceptions import ParseError


class Home(TemplateView):
    template_name = 'parserator_web/index.html'


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        params = {}
        input_string = request.GET.get("address")
        print(input_string)
        if input_string:
            address_comps, address_type = self.parse(input_string)
            params = {"input_string": input_string, 
                      "address_components" : address_comps,
                      "address_type" : address_type}
        
        print(params)
        return Response(params) 

    def parse(self, address):
        address_components, address_type = usaddress.tag(address)
        # TODO: Implement this method to return the parsed components of a
        # given address using usaddress: https://github.com/datamade/usaddress
        return address_components, address_type
