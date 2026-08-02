from fastapi import APIRouter
from pydantic import BaseModel
from core.main import new_query

router = APIRouter(prefix='/query', tags=["query"])

class CreateQueryRequest(BaseModel):
    query: str

@router.post('')
async def api_new_query(payload: CreateQueryRequest):
    return await new_query(query=payload.query)