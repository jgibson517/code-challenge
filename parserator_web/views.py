import usaddress
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from usaddress import RepeatedLabelError
from rest_framework.exceptions import ParseError


class Home(TemplateView):
    template_name = "parserator_web/index.html"


class AddressParse(APIView):
    renderer_classes = [JSONRenderer]

    def get(self, request):
        params = {
            "input_string": None,
            "address_components": None,
            "address_type": None,
        }

        input_string = request.GET.get("address")
        # return empty response if no address inputted
        if not input_string:
            return Response(params)

        try:
            address_comps, address_type = self.parse(input_string)
        except RepeatedLabelError as e:
            raise ParseError(
                f"Error parsing inputed string: {e.original_string}. \
                    Address may have duplicated parts"
            )

        return Response(
            {
                "input_string": input_string,
                "address_components": address_comps,
                "address_type": address_type,
            }
        )

    def parse(self, address):
        """Parses address, returns address type and components"""
        address_components, address_type = usaddress.tag(address)
        return address_components, address_type
