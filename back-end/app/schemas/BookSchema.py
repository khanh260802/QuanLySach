from pydantic import BaseModel, Field
from typing import Optional

class BookSchema(BaseModel):
    title: str = Field(..., min_length=1, max_length=10)
    author: str = Field(..., min_length=1, max_length=30)
    published_date: Optional[str]
    # desc: Optional[str] = Field(None, max_length=500)
