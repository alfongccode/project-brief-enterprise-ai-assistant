from fastapi import APIRouter, FastAPI
from . import querys

router = APIRouter()

router.include_router(querys.router)

web_api = FastAPI()
web_api.include_router(router)