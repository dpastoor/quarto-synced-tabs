# notes

The tab itself is an `a` tag

```
 <a
        class="nav-link active"
        id="tabset-1-1-tab"
        data-bs-toggle="tab"
        data-bs-target="#tabset-1-1"
        role="tab"
        aria-controls="tabset-1-1"
        aria-selected="false"
        >R</a
      >
```

where the inner HTML (eg R/Python) in this case can be a reasonable unique identifier.

when id'd should target the tab content as well

```
<div
      id="tabset-1-1"
      class="tab-pane active"
      role="tabpanel"
      aria-labelledby="tabset-1-1-tab"
>
```

which we can use either to target 