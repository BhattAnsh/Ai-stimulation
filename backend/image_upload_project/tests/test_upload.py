
import pytest
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

@pytest.fixture
def test_image():
    return ('file', ('test.png', b"dummy image content", 'image/png'))

def test_upload_image(test_image):
    response = client.post("/upload", files=[test_image])
    assert response.status_code == 200
    assert "url" in response.json()
    assert response.json()["url"] == "https://example.com/generated-video.mp4"
