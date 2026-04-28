# recommender/utils/preprocessing.py
import json
import os
from recommender.api.ingestion import normalise_bulk

INTERNAL_PLACES_PATH = os.path.join(
    os.path.dirname(__file__), "../../data/places.json"
)
EMBEDDINGS_CACHE = os.path.join(
    os.path.dirname(__file__), "../../data/place_embeddings.pkl"
)

def bust_cache():
    if os.path.exists(EMBEDDINGS_CACHE):
        os.remove(EMBEDDINGS_CACHE)

def load_from_formatted_json(source_path: str) -> int:
    with open(source_path) as f:
        raw = json.load(f)               # works for both list and dict now

    normalised = normalise_bulk(raw)

    with open(INTERNAL_PLACES_PATH, "w") as f:
        json.dump(normalised, f, indent=2, ensure_ascii=False)

    bust_cache()
    print(f"Loaded {len(normalised)} places → {INTERNAL_PLACES_PATH}")
    return len(normalised)

def load_internal_places() -> list[dict]:
    with open(INTERNAL_PLACES_PATH) as f:
        return json.load(f)