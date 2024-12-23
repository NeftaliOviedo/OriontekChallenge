from pymongo import MongoClient
from pathlib import Path

MONGO_URI = "mongodb+srv://noviedo:xDlGFTsjFYNmYdQl@oriontekcluster.32wtf.mongodb.net/?retryWrites=true&w=majority&appName=OriontekCluster"
MONGO_DB_NAME = 'test'
ALLOWED_HOSTS = ['*']

# Initialize the MongoDB client and database
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[MONGO_DB_NAME]

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ok-e+qj6-d@t!yjr0pdz=vqlg80ccn_+r#*yj**l*iwk!qi$#&'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True    



# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # It should be first
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'oriontekapipy.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'oriontekapipy.wsgi.application'


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOW_ALL_ORIGINS = True
CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',  # React dev server
    'http://127.0.0.1:3000',
]
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # React development server
    'http://127.0.0.1:3000',
]
CORS_ALLOW_METHODS = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
]
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
]
CORS_ALLOW_ALL_ORIGINS = True  # To allow all origins (be cautious for production)
CORS_ALLOW_CREDENTIALS = True  # Allow credentials like cookies, Authorization headers



CORS_LOGGING = True

CSRF_COOKIE_SAMESITE = 'Lax'  # Choose appropriate value based on your needs
CSRF_COOKIE_HTTPONLY = False 

CSRF_COOKIE_NAME = 'csrftoken'

CSRF_COOKIE_HTTPONLY = True  # Ensures CSRF token is sent only in HTTP requests (not accessible in JS)
CSRF_COOKIE_SAMESITE = 'Lax'  # To allow CSRF cookie in cross-site requests (important for CORS)
CSRF_COOKIE_SECURE = False  