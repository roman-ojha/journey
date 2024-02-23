from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
import os
import base64


def decrypt_with_private_key(encrypted_data: str):
    # Retrieve the private key from environment variable
    private_key_pem = os.getenv('PROJECT_PRIVATE_KEY')

    if not private_key_pem:
        raise ValueError('Private key not found in environment variable')

    # Load the private key
    private_key = serialization.load_pem_private_key(
        private_key_pem.encode(),
        password=None,
        backend=default_backend()
    )

    # Decode the base64 encoded encrypted data
    encrypted_bytes = base64.b64decode(encrypted_data)

    # Perform decryption
    decrypted_data = private_key.decrypt(
        encrypted_bytes,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA1()),
            algorithm=hashes.SHA1(),
            label=None
        )
    )
    return decrypted_data.decode()
