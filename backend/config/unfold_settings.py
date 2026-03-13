# Настройки для Django Unfold
from django.urls import reverse_lazy
from django.utils.translation import gettext_lazy as _

UNFOLD = {
    "SITE_TITLE": "Elements KZ Admin",
    "SITE_HEADER": "Elements KZ",
    "SITE_URL": "/",
    "SITE_ICON": None,
    "SITE_LOGO": None,
    "SITE_SYMBOL": "🛒",
    
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    
    "ENVIRONMENT": "dev",
    
    "DASHBOARD_CALLBACK": None,
    
    "COLORS": {
        "primary": {
            "50": "238 242 255",
            "100": "224 231 255",
            "200": "199 210 254",
            "300": "165 180 252",
            "400": "129 140 248",
            "500": "99 102 241",
            "600": "79 70 229",
            "700": "67 56 202",
            "800": "55 48 163",
            "900": "49 46 129",
        },
    },
    
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
    },
}
