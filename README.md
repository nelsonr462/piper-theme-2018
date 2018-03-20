#REFERENCE

###Setup
1. Clone this repo.
2. Run `npm install` in main install directory ('piper-theme-2018')
3. Any deployment/watch commands default to the `DEVELOPMENT` environment. You must specify `PRODUCTION` to deploy to the live theme.
4. This theme was built using Shopify's Slate toolkit. Documentation can be found [here](https://shopify.github.io/slate/)
5. This theme uses Spectre, a CSS/SCSS framework. Documentation can be found [here](https://picturepan2.github.io/spectre/elements.html)

---

###Adding new dynamic block pages:

1. Navigate to directory where repo is cloned and use `slate watch` to set up a watcher.
2. Create new `page.{newpage}.liquid` in `src/templates/`
3. Create new `{newsection}.liquid` in `src/sections/`
4. Add `{% section '{newsection}' %}` to `page.{newpage}.liquid`
5. Create `{newpage}.scss` file in `src/styles/modules/`
6. Add scss file to `src/styles/theme.scss` file with import statement
7. Create page in Shopify Admin and select new `page.{newpage}.liquid` template
8. Use following templates for `{newsection}.liquid`:

```
<div data-section-id="{{ section.id }}">
  {% for block in section.blocks %}
  <div {{ block.shopify_attributes }}>
    {% case block.type %}

      {% when 'newblock' %}
      {% include 'newblock' %} 

    {% endcase %}
  </div>
  {% endfor %}
</div>
```

⋅⋅⋅ This includes the desired block liquid templates found in src/snippets/ when they are chosen from the Shopify theme editor. For example `card-cta.liquid` or `blog-hero.liquid`. However, note that all files found in `src/snippets` are **NOT** all blocks. There are other snippets used to store things such as meta tags and icons.

```
{% schema %}
  {
    "blocks": [
      {
        "type": "newblock",
        "name": "New Block",
        "settings": [
          {
            "id": "new-block-color",
            "type": "select",
            "label": "Color",
            "default": "blue",
            "options": [
                { "value": "blue", "label": "Blue" },
                { "value": "", "label": "Purple" },
                { "value": "transparent", "label": "Transparent" }
            ]
          },
          {
            "id": "new-block-background",
            "type": "image_picker",
            "label": "Background (Optional)"
          }

        ]
      }
    ]
  }
{% endschema %}

```

⋅⋅⋅ This settings schema allows for each page to maintain unique settings for each block, and provides the customizability of each section.

⋅⋅⋅ More documentation regarding blocks and settings schemas can be found [here](https://help.shopify.com/themes/development/sections#blocks)


⋅⋅⋅ Any blocks added via the if statement and settings schema should now appear in the Shopify theme editor `Add Content` menu

#####Block settings schema must unfortunately be maintained manually. i.e. every block's schema must be updated if new settings are added to one section, if the same setting is desired across the theme.