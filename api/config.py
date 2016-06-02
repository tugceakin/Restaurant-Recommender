import os

DEBUG = True

TOKEN_SECRET = os.environ.get('SECRET_KEY') or 'JWT Token Secret String'
GOOGLE_SECRET = os.environ.get('GOOGLE_SECRET') or 'Google Client Secret'