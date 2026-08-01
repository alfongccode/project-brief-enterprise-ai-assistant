from fastapi import APIRouter
from pydantic import BaseModel
from core.main import new_query

router = APIRouter(prefix='/querys', tags=["querys"])

class CreateProductRequest(BaseModel):
    text: str

@router.post('')
async def api_new_query(payload: CreateProductRequest):
    return await new_query(text=payload.text)