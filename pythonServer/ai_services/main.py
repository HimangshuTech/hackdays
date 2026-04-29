from dotenv import load_dotenv
load_dotenv()


import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from recommender.api.routes import recommend, places, ingest, chat
from recommender.utils.preprocessing import load_from_formatted_json, load_internal_places
from recommender.model.similarity import build_place_corpus



app = FastAPI(
    title="Eco Tourism Recommender API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, tags=["Chatbot"])
app.include_router(recommend.router, tags=["Recommendations"])
app.include_router(places.router,    tags=["Places"])
app.include_router(ingest.router,    tags=["Ingestion"])

SOURCE_JSON = os.path.join(os.path.dirname(__file__), "data/output.json")

@app.on_event("startup")
def startup():
    load_from_formatted_json(SOURCE_JSON)


    places_data = load_internal_places()
    build_place_corpus(places_data)
    print(f"Server ready. {len(places_data)} places loaded.")

@app.get("/health")
def health():
    return {"status": "ok", "service": "recommender"}