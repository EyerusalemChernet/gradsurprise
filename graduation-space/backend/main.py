"""
Graduation Space Adventure - FastAPI Backend
Handles messages between Dikuse and AstroJerry's Message Station
"""

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional, List
from jose import JWTError, jwt
from passlib.context import CryptContext
import os

# ── Database setup ──────────────────────────────────────────────────────────
DATABASE_URL = "sqlite:///./graduation.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ── Security config ──────────────────────────────────────────────────────────
SECRET_KEY = os.getenv("SECRET_KEY", "astrojerry-secret-space-key-2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "astrojerry")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "graduation2024")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="admin/login")

# ── Models ───────────────────────────────────────────────────────────────────
class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    sender_name = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    reply = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    replied_at = Column(DateTime, nullable=True)
    is_read = Column(Boolean, default=False)

Base.metadata.create_all(bind=engine)

# ── Pydantic schemas ──────────────────────────────────────────────────────────
class MessageCreate(BaseModel):
    sender_name: str
    content: str

class MessageOut(BaseModel):
    id: int
    sender_name: str
    content: str
    reply: Optional[str]
    created_at: datetime
    replied_at: Optional[datetime]

    class Config:
        from_attributes = True

class ReplyCreate(BaseModel):
    message_id: int
    reply: str

class Token(BaseModel):
    access_token: str
    token_type: str

# ── Helpers ───────────────────────────────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_admin(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username != ADMIN_USERNAME:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return username

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(title="Graduation Space API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Public routes ─────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "AstroJerry's Message Station is online 🚀"}

@app.post("/messages", response_model=MessageOut, status_code=201)
def send_message(payload: MessageCreate, db: Session = Depends(get_db)):
    """Dikuse sends a message to AstroJerry"""
    msg = Message(sender_name=payload.sender_name, content=payload.content)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

@app.get("/messages", response_model=List[MessageOut])
def get_messages(db: Session = Depends(get_db)):
    """Retrieve all messages (public - Dikuse can see replies)"""
    return db.query(Message).order_by(Message.created_at.desc()).all()

# ── Admin routes ──────────────────────────────────────────────────────────────
@app.post("/admin/login", response_model=Token)
def admin_login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Admin login - returns JWT token"""
    if form_data.username != ADMIN_USERNAME:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    # For simplicity, compare plain text (in production use hashed passwords)
    if form_data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = create_access_token(
        data={"sub": form_data.username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": token, "token_type": "bearer"}

@app.get("/admin/messages", response_model=List[MessageOut])
def admin_get_messages(db: Session = Depends(get_db), _: str = Depends(get_current_admin)):
    """Admin reads all messages"""
    msgs = db.query(Message).order_by(Message.created_at.desc()).all()
    # Mark all as read
    for m in msgs:
        m.is_read = True
    db.commit()
    return msgs

@app.post("/admin/reply", response_model=MessageOut)
def admin_reply(payload: ReplyCreate, db: Session = Depends(get_db), _: str = Depends(get_current_admin)):
    """Admin replies to a message"""
    msg = db.query(Message).filter(Message.id == payload.message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.reply = payload.reply
    msg.replied_at = datetime.utcnow()
    db.commit()
    db.refresh(msg)
    return msg
