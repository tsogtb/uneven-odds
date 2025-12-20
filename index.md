---
layout: page
title: '<br><span class="uneven-word"><span class="wobbleright" style="font-size:0.9em; font-weight:600;">U</span><span style="font-size:0.9em; font-weight:600">neven</span></span><br><span style="font-size:0.9em; font-weight:600;">Friendships</span> <span style="font-size:0.6em; font-weight:500;">&</span><br><span style="font-size:0.9em; font-weight:600;">One-sided Wars</span>'
subtitle: '<span style="font-weight:700; font-size:0.9em">Polarity</span> <span style="font-weight:700; font-size:0.9em">Asymmetries</span> <span style="font-size:0.9em">in</span> <span style="font-weight:700; font-size:0.9em;">Reddit</span><span style="font-weight:700; font-size:0.9em;"> Communities'
cover-img: /assets/img/ultra_deep_field.jpg
toc: true
full-width: true
animate-cover: true
---

{: .toc }

- TOC
{:toc}



<!--toc-->

### Introduction  test

If Reddit communities were people at a party, some would spend the whole evening debating loudly, others
would quietly observe from the corner, and a few would spend their time gossiping about groups who barely
even know they exist.
Online platforms are often described through trends, topics, or viral posts, but rarely do we look at how entire
communities talk about one another.
Yet, behind Reddit’s chaotic surface lies a vast web of interactions: every time a subreddit links to another, it
expresses something, approval, criticism, curiosity, or sometimes outright hostility. What if we could map these
signals? What if we could uncover not just who speaks, but who speaks about whom, and how?

**[graph of reddit communities and links]**

This is where the best data analysists of the universe <a href="/about/" target="_blank" rel="noopener">we</a> come in action

**[presentation of each of us]**

### Dataset

The Reddit Hyperlink Network dataset contains 858,488 hyperlinks exchanged between 67,180 subreddits from
2014 to 2017. Each hyperlink represents one subreddit mentioning another in a post, giving us a directional
interaction (A → B) along with its timestamp. Each link is enriched with a sentiment score (positive, neutral, or
negative) and detailed linguistic features from LIWC, capturing emotions, tone, and cognitive signals.
Together, these elements allow us to reconstruct Reddit as a network of inter-community relationships and
explore how subreddits reference, praise, criticize, or ignore one another over time.

**[Maybe a cool presentation of the important numbers in the dataset → see 4th project on beers]**

### Research Questions

1. **Which subreddit pairs show the strongest polarity asymmetries?**

2. **Are one-sided hostilities different from mutual hostilities?**


3. **What impact do polarity asymmetries have on the network?**

<u>EDA and data pre-processing?</u>
<u>When A hates B but B barely looks back</u>
<u>Most relationships are boring… but a few are extreme</u>

### Methods

First, we average the sentiment from A→B and from B→A for every pair of subreddits. Then we compute an
asymmetry score:
if both directions have similar sentiment, the score is low; if one is friendly and the other is hostile (or one side
is active and the other silent), the score is high.
When we look at all pairs, most relationships are fairly balanced. But the distribution has a long tail: a small
fraction of subreddit pairs show very strong asymmetry

**[histogram of asymmetric score]**

<u>The top “one-sided wars”</u>

We then rank pairs by their asymmetry score and focus on the top cases. Present them and analyze in detail
the plots and their results. We see that some patterns emerge from that: those who send negative links barely
get answers from their target. Analyze maybe at this point the sizes of both communities.

**[barplot – top asymmetric pairs]**

**[interactive table with source-target-average sentimentA→B-average sentiment B→A-asymmetry type-asymmetry score]**


### Types of relationships

Clustering. Not all asymmetric pairs are the same. Based on sentiment in both directions, and whether the
target answers or no, we classify them into:


- **One-sided negative**: A is hostile to B; B is neutral or positive.
- **Mutual negative**: A and B attack each other.
- **One-sided positive**: one side is very positive, the other is neutral.
- **Mutual positive**: they praise each other.
- **Mutual neutrality**: both acts neutrally to each other (asymmetric scrore around 0)
- **Unidirectional**: only one side ever links to the other.

<!-- Load Plotly.js from CDN -->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<!-- Relationship Type Distribution Visualization -->
<div id="relationship-type-distribution" class="plotly-graph-div" style="height:500px; width:100%; max-width:1200px; margin: 0 auto;"></div>

<script type="text/javascript">
    window.PLOTLYENV = window.PLOTLYENV || {};
    
    function initPlotlyVisualization() {
        if (typeof Plotly !== 'undefined' && document.getElementById("relationship-type-distribution")) {
            Plotly.newPlot(
            "relationship-type-distribution",
            [
                {
                    "marker": {"color": ["rgb(141,211,199)", "rgb(255,255,179)", "rgb(190,186,218)", "rgb(251,128,114)", "rgb(128,177,211)", "rgb(253,180,98)", "rgb(179,222,105)"]},
                    "name": "Relationship Type Counts",
                    "opacity": 0.85,
                    "x": ["one-sided (pos)", "mutual positive", "one-sided (neg)", "one-sided (neu)", "opposite polarity", "mutual negative", "mutual neutral"],
                    "y": {"dtype": "i4", "bdata": "OPMDAJdoAAAgRQAAERMAAPcEAACZAAAAEwAAAA=="},
                    "type": "bar",
                    "xaxis": "x",
                    "yaxis": "y"
                },
                {
                    "hole": 0.35,
                    "hovertemplate": "%{label}: %{percent:.2%} <extra></extra>",
                    "labels": ["one-sided (pos)", "mutual positive", "one-sided (neg)", "one-sided (neu)", "opposite polarity", "mutual negative", "mutual neutral"],
                    "marker": {"colors": ["rgb(141,211,199)", "rgb(255,255,179)", "rgb(190,186,218)", "rgb(251,128,114)", "rgb(128,177,211)", "rgb(253,180,98)", "rgb(179,222,105)"]},
                    "name": "Relationship Type (Percentage)",
                    "textinfo": "label+percent",
                    "values": {"dtype": "f8", "bdata": "2NtdizPmVECUDUju8kohQDh5iZms2xZAipWZOSc4+T+y2gzhqUTaP3rAlm/+S6k/32Q2yaoheT8="},
                    "type": "pie",
                    "domain": {"x": [0.55, 1.0], "y": [0.0, 1.0]}
                },
                {"marker": {"color": "rgb(141,211,199)"}, "name": "one-sided (pos) (83.597%)", "x": [null], "y": [null], "type": "bar", "xaxis": "x", "yaxis": "y"},
                {"marker": {"color": "rgb(255,255,179)"}, "name": "mutual positive (8.646%)", "x": [null], "y": [null], "type": "bar", "xaxis": "x", "yaxis": "y"},
                {"marker": {"color": "rgb(190,186,218)"}, "name": "one-sided (neg) (5.715%)", "x": [null], "y": [null], "type": "bar", "xaxis": "x", "yaxis": "y"},
                {"marker": {"color": "rgb(251,128,114)"}, "name": "one-sided (neu) (1.576%)", "x": [null], "y": [null], "type": "bar", "xaxis": "x", "yaxis": "y"},
                {"marker": {"color": "rgb(128,177,211)"}, "name": "opposite polarity (0.410%)", "x": [null], "y": [null], "type": "bar", "xaxis": "x", "yaxis": "y"},
                {"marker": {"color": "rgb(253,180,98)"}, "name": "mutual negative (0.049%)", "x": [null], "y": [null], "type": "bar", "xaxis": "x", "yaxis": "y"},
                {"marker": {"color": "rgb(179,222,105)"}, "name": "mutual neutral (0.006%)", "x": [null], "y": [null], "type": "bar", "xaxis": "x", "yaxis": "y"}
            ],
            {
                "template": {
                    "data": {
                        "histogram2dcontour": [{"type": "histogram2dcontour", "colorbar": {"outlinewidth": 0, "ticks": ""}, "colorscale": [[0.0, "#0d0887"], [0.1111111111111111, "#46039f"], [0.2222222222222222, "#7201a8"], [0.3333333333333333, "#9c179e"], [0.4444444444444444, "#bd3786"], [0.5555555555555556, "#d8576b"], [0.6666666666666666, "#ed7953"], [0.7777777777777778, "#fb9f3a"], [0.8888888888888888, "#fdca26"], [1.0, "#f0f921"]]}],
                        "choropleth": [{"type": "choropleth", "colorbar": {"outlinewidth": 0, "ticks": ""}}],
                        "histogram2d": [{"type": "histogram2d", "colorbar": {"outlinewidth": 0, "ticks": ""}, "colorscale": [[0.0, "#0d0887"], [0.1111111111111111, "#46039f"], [0.2222222222222222, "#7201a8"], [0.3333333333333333, "#9c179e"], [0.4444444444444444, "#bd3786"], [0.5555555555555556, "#d8576b"], [0.6666666666666666, "#ed7953"], [0.7777777777777778, "#fb9f3a"], [0.8888888888888888, "#fdca26"], [1.0, "#f0f921"]]}],
                        "heatmap": [{"type": "heatmap", "colorbar": {"outlinewidth": 0, "ticks": ""}, "colorscale": [[0.0, "#0d0887"], [0.1111111111111111, "#46039f"], [0.2222222222222222, "#7201a8"], [0.3333333333333333, "#9c179e"], [0.4444444444444444, "#bd3786"], [0.5555555555555556, "#d8576b"], [0.6666666666666666, "#ed7953"], [0.7777777777777778, "#fb9f3a"], [0.8888888888888888, "#fdca26"], [1.0, "#f0f921"]]}],
                        "contourcarpet": [{"type": "contourcarpet", "colorbar": {"outlinewidth": 0, "ticks": ""}}],
                        "contour": [{"type": "contour", "colorbar": {"outlinewidth": 0, "ticks": ""}, "colorscale": [[0.0, "#0d0887"], [0.1111111111111111, "#46039f"], [0.2222222222222222, "#7201a8"], [0.3333333333333333, "#9c179e"], [0.4444444444444444, "#bd3786"], [0.5555555555555556, "#d8576b"], [0.6666666666666666, "#ed7953"], [0.7777777777777778, "#fb9f3a"], [0.8888888888888888, "#fdca26"], [1.0, "#f0f921"]]}],
                        "surface": [{"type": "surface", "colorbar": {"outlinewidth": 0, "ticks": ""}, "colorscale": [[0.0, "#0d0887"], [0.1111111111111111, "#46039f"], [0.2222222222222222, "#7201a8"], [0.3333333333333333, "#9c179e"], [0.4444444444444444, "#bd3786"], [0.5555555555555556, "#d8576b"], [0.6666666666666666, "#ed7953"], [0.7777777777777778, "#fb9f3a"], [0.8888888888888888, "#fdca26"], [1.0, "#f0f921"]]}],
                        "mesh3d": [{"type": "mesh3d", "colorbar": {"outlinewidth": 0, "ticks": ""}}],
                        "scatter": [{"fillpattern": {"fillmode": "overlay", "size": 10, "solidity": 0.2}, "type": "scatter"}],
                        "parcoords": [{"type": "parcoords", "line": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "scatterpolargl": [{"type": "scatterpolargl", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "bar": [{"error_x": {"color": "#2a3f5f"}, "error_y": {"color": "#2a3f5f"}, "marker": {"line": {"color": "#E5ECF6", "width": 0.5}, "pattern": {"fillmode": "overlay", "size": 10, "solidity": 0.2}}, "type": "bar"}],
                        "scattergeo": [{"type": "scattergeo", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "scatterpolar": [{"type": "scatterpolar", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "histogram": [{"marker": {"pattern": {"fillmode": "overlay", "size": 10, "solidity": 0.2}}, "type": "histogram"}],
                        "scattergl": [{"type": "scattergl", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "scatter3d": [{"type": "scatter3d", "line": {"colorbar": {"outlinewidth": 0, "ticks": ""}}, "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "scattermap": [{"type": "scattermap", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "scattermapbox": [{"type": "scattermapbox", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "scatterternary": [{"type": "scatterternary", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "scattercarpet": [{"type": "scattercarpet", "marker": {"colorbar": {"outlinewidth": 0, "ticks": ""}}}],
                        "carpet": [{"aaxis": {"endlinecolor": "#2a3f5f", "gridcolor": "white", "linecolor": "white", "minorgridcolor": "white", "startlinecolor": "#2a3f5f"}, "baxis": {"endlinecolor": "#2a3f5f", "gridcolor": "white", "linecolor": "white", "minorgridcolor": "white", "startlinecolor": "#2a3f5f"}, "type": "carpet"}],
                        "table": [{"cells": {"fill": {"color": "#EBF0F8"}, "line": {"color": "white"}}, "header": {"fill": {"color": "#C8D4E3"}, "line": {"color": "white"}}, "type": "table"}],
                        "barpolar": [{"marker": {"line": {"color": "#E5ECF6", "width": 0.5}, "pattern": {"fillmode": "overlay", "size": 10, "solidity": 0.2}}, "type": "barpolar"}],
                        "pie": [{"automargin": true, "type": "pie"}]
                    },
                    "layout": {
                        "autotypenumbers": "strict",
                        "colorway": ["#636efa", "#EF553B", "#00cc96", "#ab63fa", "#FFA15A", "#19d3f3", "#FF6692", "#B6E880", "#FF97FF", "#FECB52"],
                        "font": {"color": "#2a3f5f"},
                        "hovermode": "closest",
                        "hoverlabel": {"align": "left"},
                        "paper_bgcolor": "white",
                        "plot_bgcolor": "#E5ECF6",
                        "polar": {"bgcolor": "#E5ECF6", "angularaxis": {"gridcolor": "white", "linecolor": "white", "ticks": ""}, "radialaxis": {"gridcolor": "white", "linecolor": "white", "ticks": ""}},
                        "ternary": {"bgcolor": "#E5ECF6", "aaxis": {"gridcolor": "white", "linecolor": "white", "ticks": ""}, "baxis": {"gridcolor": "white", "linecolor": "white", "ticks": ""}, "caxis": {"gridcolor": "white", "linecolor": "white", "ticks": ""}},
                        "coloraxis": {"colorbar": {"outlinewidth": 0, "ticks": ""}},
                        "colorscale": {
                            "sequential": [[0.0, "#0d0887"], [0.1111111111111111, "#46039f"], [0.2222222222222222, "#7201a8"], [0.3333333333333333, "#9c179e"], [0.4444444444444444, "#bd3786"], [0.5555555555555556, "#d8576b"], [0.6666666666666666, "#ed7953"], [0.7777777777777778, "#fb9f3a"], [0.8888888888888888, "#fdca26"], [1.0, "#f0f921"]],
                            "sequentialminus": [[0.0, "#0d0887"], [0.1111111111111111, "#46039f"], [0.2222222222222222, "#7201a8"], [0.3333333333333333, "#9c179e"], [0.4444444444444444, "#bd3786"], [0.5555555555555556, "#d8576b"], [0.6666666666666666, "#ed7953"], [0.7777777777777778, "#fb9f3a"], [0.8888888888888888, "#fdca26"], [1.0, "#f0f921"]],
                            "diverging": [[0, "#8e0152"], [0.1, "#c51b7d"], [0.2, "#de77ae"], [0.3, "#f1b6da"], [0.4, "#fde0ef"], [0.5, "#f7f7f7"], [0.6, "#e6f5d0"], [0.7, "#b8e186"], [0.8, "#7fbc41"], [0.9, "#4d9221"], [1, "#276419"]]
                        },
                        "xaxis": {"gridcolor": "white", "linecolor": "white", "ticks": "", "title": {"standoff": 15}, "zerolinecolor": "white", "automargin": true, "zerolinewidth": 2},
                        "yaxis": {"gridcolor": "white", "linecolor": "white", "ticks": "", "title": {"standoff": 15}, "zerolinecolor": "white", "automargin": true, "zerolinewidth": 2},
                        "scene": {"xaxis": {"backgroundcolor": "#E5ECF6", "gridcolor": "white", "linecolor": "white", "showbackground": true, "ticks": "", "zerolinecolor": "white", "gridwidth": 2}, "yaxis": {"backgroundcolor": "#E5ECF6", "gridcolor": "white", "linecolor": "white", "showbackground": true, "ticks": "", "zerolinecolor": "white", "gridwidth": 2}, "zaxis": {"backgroundcolor": "#E5ECF6", "gridcolor": "white", "linecolor": "white", "showbackground": true, "ticks": "", "zerolinecolor": "white", "gridwidth": 2}},
                        "shapedefaults": {"line": {"color": "#2a3f5f"}},
                        "annotationdefaults": {"arrowcolor": "#2a3f5f", "arrowhead": 0, "arrowwidth": 1},
                        "geo": {"bgcolor": "white", "landcolor": "#E5ECF6", "subunitcolor": "white", "showland": true, "showlakes": true, "lakecolor": "white"},
                        "title": {"x": 0.05},
                        "mapbox": {"style": "light"}
                    }
                },
                "xaxis": {"anchor": "y", "domain": [0.0, 0.45], "title": {"text": "Relationship Type"}, "tickangle": 45},
                "yaxis": {"anchor": "x", "domain": [0.0, 1.0], "title": {"text": "Number of Pairs (log scale)"}, "type": "log"},
                "annotations": [
                    {"font": {"size": 16}, "showarrow": false, "text": "Distribution of Relationship Types", "x": 0.225, "xanchor": "center", "xref": "paper", "y": 1.0, "yanchor": "bottom", "yref": "paper"},
                    {"font": {"size": 16}, "showarrow": false, "text": "Relationship Types (Percentage)", "x": 0.775, "xanchor": "center", "xref": "paper", "y": 1.0, "yanchor": "bottom", "yref": "paper"}
                ],
                "margin": {"t": 40, "l": 30, "r": 30, "b": 30},
                "height": 500,
                "width": 1200,
                "showlegend": false,
                "legend": {"title": {"text": "Relationship Type"}, "x": 1.05, "y": 0.8, "bordercolor": "Black", "borderwidth": 0.5}
            },
            {"responsive": true}
            );
        }
    }
    
    // Wait for Plotly to load, then initialize
    if (typeof Plotly !== 'undefined') {
        initPlotlyVisualization();
    } else {
        window.addEventListener('load', function() {
            if (typeof Plotly !== 'undefined') {
                initPlotlyVisualization();
            }
        });
    }
</script>

// Analyze: “This tells us that most of Reddit is not in
constant war, but when we do see extreme polarity differences, they are more often due to one side throwing
rocks than two sides shouting at each other.

### Closer look at the interactions

<u>Do One-Sided Attacks “sound” different?</u>
<u>How do interactions looks like ?</u>

Explain the interactions with the LIWC features, their importance in the link sentiment, and how to interpret
them. Make an ML model to predict which LIWC will mostly lead to a negative sentiment.

<u>What is LIWC?</u>
Small <a href="/liwc/" target="_blank" rel="noopener">part</a> on the website explaining how it works, 3-4 bullet points so anyone can understand the idea behind
it, and their importance in our analysis. à speech bubble where our reddit character is questioning himself?

<u>Hostile vs non-hostile language</u>

Analyze the impact of some LIWC features on whether the message will be considered negaFve or positive we
see that the negativity has way more impact than positivity that seems kind of neutral.

**[Interactive table of correlation with link sentiment]**

**[Add a barplot with a few features (those from the table, anger, swear, posemo, negemo) and see the part of positive and negative links]**


<u>One-sided vs mutual hostilities</u>

The most interesting question is not “What does negativity look like?” but “What’s different about a one-sided
aiack compared to a mutual fight?”. We focus on these two groups: one-sided negative pairs and mutual
negative pairs. For each group, we compare LIWC features.

**[barplot for visualization]**

### Attackers, Receivers and the Peaceful ones

<u>From pairs to a global map</u>

So far, we only looked at pairs of subreddits. But all these relaFonships live inside a much bigger structure: a
network where each node is a subreddit and edges are hyperlinks between them. The objective here is to put
these pairs into the context of all the subreddits interacFng with each other’s. Here we can see the most acFve
ones, the most hostile and non-hostile ones, the more receiver ones…

**[barplot with top10 or top20 subreddits of different categories]**

**[a big visualization of the network where the important subreddits and the interactions are visible àbigger dots and bigger edges]**

<u>Role types: attackers, receivers, peaceful</u>

This gives us a coarse but intuitive typology of reddit communities

<u>Hierarchy: who shapes the landscape</u>

Beyond roles, some communities are structurally central in the network: they receive links from many other subreddits and have high PageRank or in-degree. When we cross roles with centrality, we can see: whether receivers tend to be big, whether aiackers are more peripherical communities, whether peaceful communities play a central role in information flow.

**[boxplot PageRank by role]**

<u>Do asymmetries and link sentiment tend to change over time</u>

Finally, we look at how asymmetric relationships evolve between 2014 and 2017: does the number of one-sided hostilities increase or decrease? do certain subreddits keep the same role over years, or do they switch from peaceful to attacker, from receiver to mutual hostile?

**[complete temporal analysis, maybe taking some examples subreddits and following their evolving curves]**

### Conclusion

<u>What did we learn about Reddit and about the interactions between communities in general?</u>

Our exploration of the Reddit Hyperlink Network reveals that online platforms are not just collections of isolated conversations—they are ecosystems where communities constantly observe, reference, judge, and respond to one another. By examining millions of directional links enriched with sentiment and linguistic
information, we uncovered patterns that would remain invisible at the level of individual posts.

We learned that most subreddit relationships are relatively balanced, shaped by routine exchanges and neutral mentions. Yet beneath this surface lies a smaller but highly influential set of asymmetric relationships, where one community directs strong negativity toward another that barely replies, or where interaction flows in only one direction. These imbalances form the backbone of online attention dynamics: some subreddits act as outspoken critics, others as lightning rods, others still as peaceful enclaves detached from conflict.

anguage plays a central role in shaping these dynamics. Hostile interactions carry distinct emotional and
cognitive signatures, and one-sided hostility often looks linguistically different from mutual rivalry. These
linguistic signals help us understand why certain interactions escalate and others remain one-directional.
Can we really say that wars are ongoing in social medias? Do Reddit can be representative of the others? Why
in the end the climate is always negative, even though we saw that the negativity isn’t dominant at all?
If “war” is understood not as physical confrontation but as asymmetric engagement and emotional escalation,
then yes, our findings show that some of these dynamics do emerge in social media interactions. They are
subtle, distributed, and linguistic rather than physical, but they shape the reputation, cohesion, and visibility of
communities in powerful ways.
Ultimately, what we uncovered is not a battlefield, but a complex social landscape where attention is uneven,
emotions travel asymmetrically, and communities position themselves relative to one another in ways that
matter for how information spreads and how online identities are constructed.
Our work highlights that understanding these dynamics is not about labeling winners and losers, but about
gaining insight into how digital societies function, and how relationships between groups evolve online,
sometimes harmoniously, often unevenly, and occasionally, in ways that resemble one-sided wars.

2 main parts:
1. analysis of the interacIons and links
2. analysis of the features and their importance in the senIment
3 research quesIons:
4. Which subreddit pairs show the strongest polarity asymmetries?
5. Are one-sided hosIliIes different from mutual hosIliIes?
6. What impact do polarity asymmetries have on the network?
