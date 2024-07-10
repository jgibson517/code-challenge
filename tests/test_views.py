import pytest  # noqa: F401


def test_api_parse_succeeds(client):

    address_string = "123 main st chicago il"
    resp = client.get(
        "/api/parse/",
        {"address": address_string},
        headers={"accept": "application/json"},
    )
    parsed_address = resp.data["address_components"]
    assert parsed_address == {
        "AddressNumber": "123",
        "StreetName": "main",
        "StreetNamePostType": "st",
        "PlaceName": "chicago",
        "StateName": "il",
    }


def test_api_parse_raises_error(client):

    address_string = "123 main st chicago il 123 main st"
    resp = client.get("/api/parse/", {"address": address_string})
    assert resp.status_code == 400
