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

<details class="iframe-sticky">
  <summary style="color:#FFF">Reddit Universe</summary>

  <iframe
    src="{{ site.baseurl }}/regl-graphics/"
    loading="lazy"
    allowfullscreen>
  </iframe>
</details>


If Reddit communities were people at a party, some would spend the whole evening debating loudly, others would quietly observe from the corner, and a few would spend their time gossiping about groups who barely even know they exist.
Online platforms are usually described through trends, viral posts, or influential users but we rarely step back and look at how entire communities talk about one another, how they form alliances, rivalries, or silent tensions across the platform.

Yet, behind Reddit’s chaotic surface lies a vast web of interactions: every time a subreddit links to another, it expresses something, approval, criticism, curiosity, or sometimes hostility. These signals accumulate into patterns far richer than what can be seen from individual posts.

<div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/reddit_network.jpeg" alt="temporal_statistics_network_growth" width="80%">
</div>

<!-- What if we could uncover not just who speaks, but who speaks about whom, and in what tone?
What if we could map Reddit not as a collection of isolated forums, but as a living ecosystem of communities reacting to each other in real time? Could Reddit’s community dynamics resemble those of our real-world society? -->

<div class="bubble">
  What if we could uncover not just who speaks, but who speaks about whom, and in what tone?<br>

  What if we could map Reddit not as a collection of isolated forums, but as a living ecosystem of communities reacting to each other in real time?<br>
  
  Could Reddit’s community dynamics resemble those of our real-world society?
</div>


By analyzing millions of directed links enriched with sentiment, we can finally explore these hidden dynamics: which groups attract admiration, which spark conflicts, which act as hubs of attention, and which are talked about far more than they ever reply.

Reddit is a vast collection of communities, called subreddits, where millions of users gather around topics ranging from news and science to gaming, culture, or niche interests. The visualization above maps this landscape by grouping subreddits according to their themes and audiences: each point is a community, and those with similar content naturally cluster into regions like gaming, Europe, STEM, or Anime. 

Rather than a chaotic list of forums, Reddit appears as a structured ecosystem with its own cultural zones. In this project, we aim to explore a small but revealing part of this universe, uncovering the hidden dynamics that shape how these communities relate to one another.

This is where the best data analysts of the universe [we]({{ "/about/" | relative_url }}) come in action.

### Dataset

If you’re curious about the dataset behind our analysis, here’s what makes it special. We used the Reddit Hyperlink Network dataset, which collects cross-subreddit mentions recorded between 2014 and 2017. Every time a post in one subreddit links to another, it produces a directional connection with a timestamp and a sentiment label indicating whether the interaction was positive or negative. In addition, each link carries linguistic information drawn from the text of the post, giving insight into tone, emotion, and expression… but we’ll come back to these features later on for a deeper explanation. 

Taken together, these elements allow us to view Reddit not as isolated forums, but as a dynamic network of relationships in which communities mention, respond to, or overlook one another. By analyzing this web of interactions, we can explore how groups engage across topics and over time, offering a richer understanding of social behavior on the platform.


Before examining the structure of interactions on Reddit, it helps to start with a high-level view of sentiment across all shared hyperlinks. Only around 10% of cross-subreddit mentions express negative sentiment, while the overwhelming majority are neutral or positive. At first glance, this suggests a largely calm and constructive environment—but as the analysis unfolds, it becomes clear that the dynamics beneath the surface are far more nuanced.


<details class="plotly-details" data-src="{{ '/assets/plots/sentiment_distribution_plot_web.html' | relative_url }}" open>
	<summary>Sentiment Distribution</summary>
	<div class="plotly-holder"></div>
</details>

### Mapping Asymmetric Relationships

Before diving into the nuances of sentiment and motivation, we first ask a simpler question: **how evenly do subreddits interact with one another?** The answer is—**very unevenly**. Some communities draw enormous attention—whether admiration, mockery, or criticism—while offering little in return. Others, by contrast, broadcast thousands of links outward but receive scant attention themselves. By examining these imbalances between incoming and outgoing mentions, we can identify which subreddits become frequent targets, which act as loud broadcasters, and how these asymmetries set the stage for the deeper relational patterns explored next.


**A First Look--Who talks much more than they listen—and what does that reveal?**

<details class="plotly-details" data-src="{{ '/assets/plots/subreddit_most_asymmetric_in_outgoing_links.html' | relative_url }}" open>
	<summary>Subreddits with Most Asymmetric Incoming vs Outgoing Links</summary>
	<div class="plotly-holder"></div>
</details>

When we compare how often communities mention others with how often they are mentioned in return, clear patterns begin to surface. One stands out immediately: **r/AskReddit** attracts an overwhelming number of incoming links—unsurprising for a community built around questions that ripple across the platform. At the other extreme lies **r/subredditdrama**, the most prolific sender of links, reflecting its explicit role as a curator of conflicts unfolding elsewhere on Reddit.

This contrast already sketches two distinct roles within the ecosystem: hubs of curiosity that draw attention inward, and hubs of commentary that project attention outward.

Together, they offer an early glimpse into Reddit’s internal dynamics, where some communities become focal points for discussion while others specialize in observing, amplifying, and reacting to the rest of the network.



<div style="background-color:#f6f8fa; padding:12px 16px; border-radius:6px; margin:1em 0;">
<strong>🔍 Structure tells us where attention flows—but what about how it feels?</strong><br>
To answer that, we turn from interaction asymmetry to sentiment asymmetry.<br>
Understanding this shift hinges on a single metric: the asymmetry score. Here’s how it is computed.
</div>



### Pairwise Sentiment and Asymmetry Computation

We model interactions between subreddits as directed edges with associated sentiment.  
Each Reddit post linking from a source subreddit to a target subreddit is treated as one observation with sentiment in {−1, +1}.

For every unordered pair of subreddits {A, B}, we compute sentiment statistics in both directions:

<div style="height: 20px;"></div>

<details>
<summary style="font-weight: bold;">Mathematical Formula</summary>

Let the sentiment of the i-th link from A to B be denoted by  

$$
X_{A \to B}^{(i)} \in \{-1, +1\}.
$$

The directional mean sentiment is:

$$
\bar{X}_{A \to B} = \frac{1}{n_{A \to B}} \sum_{i=1}^{n_{A \to B}} X_{A \to B}^{(i)}.
$$

We also record the number of links in each direction, 

$$
n_{A \to B} \quad \text{and} \quad n_{B \to A}.
$$

Each unordered pair {A, B} appears once in the dataset, with both directions represented when available.

Sentiment asymmetry measures whether one subreddit consistently expresses more positive or negative sentiment toward another than it receives in return.

The raw asymmetry is defined as:

$$
\Delta = \bar{X}_{A \to B} - \bar{X}_{B \to A}.
$$

Because raw differences can be unstable for small sample sizes, we normalize this difference by its standard error.

Since sentiment is binary, the directional mean corresponds to a probability of positive sentiment:

$$
p = \frac{\bar{X} + 1}{2}.
$$

For a binary variable in {−1, +1}, the variance of the sample mean is:

$$
\mathrm{Var}(\bar{X}) = \frac{4 p (1 - p)}{n}.
$$

The standard error of the difference between directions is therefore:

$$
\mathrm{SE}(\Delta) =
\sqrt{
\frac{4 p_{A \to B}(1 - p_{A \to B})}{n_{A \to B}} +
\frac{4 p_{B \to A}(1 - p_{B \to A})}{n_{B \to A}}
}.
$$

The final asymmetry score is defined as:

$$
\mathrm{Asymmetry}(A,B) =
\frac{\bar{X}_{A \to B} - \bar{X}_{B \to A}}{\mathrm{SE}(\Delta)}.
$$

<div style="background-color:#FFF9C4; padding:12px 16px; border-radius:6px; margin:1em 0;">
This score is positive when A is more positive toward B than B is toward A, negative in the opposite case, and increases in magnitude as asymmetry becomes stronger and better supported by data. Pairs with insufficient observations in either direction are excluded to avoid unstable estimates. </div>

</details>


**Where does sentiment flow unevenly across Reddit?**

With this score in hand, we can now identify which subreddit pairs stand out as the most asymmetric. Some communities consistently direct strong sentiment toward specific targets, allowing us to form a first picture of where the sharpest imbalances on Reddit actually lie.

<details class="plotly-details-png" open>
  <summary>Top 20 Most Asymmetric Subreddit Pairs</summary>
  <img src="{{ site.baseurl }}/assets/plots/top20_most_asymmetric_subreddit_pairs.png" alt="top20_most_asymmetric_subreddit_pairs" width="100%">
</details>



To make sense of what these asymmetric relationships look like in practice, we break each subreddit pair down into a small set of key features. The measures **`sentiment_A_to_B`** and **`sentiment_B_to_A`** capture whether references between two communities tend to be positive or negative, allowing us to compare the tone flowing in each direction. The corresponding **`count_A_to_B`** and **`count_B_to_A`** record how frequently the two sides mention one another—an essential check for separating meaningful patterns from mere coincidences. Finally, the asymmetry score brings these elements together, summarizing how much more strongly one side speaks compared to the other.

Among the most asymmetric pairs, several examples stand out. The relationship between <span style="color: #4C72B0; font-weight: 600;">r/India → r/subredditdrama</span> is strikingly one-sided. References from <span style="color: #4C72B0; font-weight: 600;">r/India</span> are consistently positive, while <span style="color: #4C72B0; font-weight: 600;">r/subredditdrama</span> responds with a much larger volume of mentions whose average sentiment hovers around 0.4. This pattern may suggest that r/India often becomes a subject of criticism, or social commentary.




Another revealing case is <span style="color: #4C72B0; font-weight: 600;">r/the_donald → r/worldnews</span>. Why would a partisan political community focus so intensely on a mainstream news forum? The answer lies in timing and context. The dataset spans the 2016 U.S. presidential election, a moment when political tensions spilled across the entire platform. During such periods, politically aligned communities often closely monitor—and challenge—mainstream news coverage, particularly when it concerns polarizing figures like Donald Trump. This dynamic naturally produces an imbalance, with sentiment flowing disproportionately in one direction.

A different kind of question emerges in the pair <span style="color: #4C72B0; font-weight: 600;">r/feminism → r/mensrights</span>. How does sentiment move between two communities built around opposing social movements? Here, <span style="color: #4C72B0; font-weight: 600;">r/feminism</span> tends to reference <span style="color: #4C72B0; font-weight: 600;">r/mensrights</span> in a relatively neutral or even positive tone, while the reverse direction more often carries negative sentiment. This asymmetry reflects broader, long-standing debates between the two movements, where engagement frequently takes the form of critique or rebuttal—but not always with equal intensity on both sides.

What do these cases tell us more broadly? They show that asymmetry is not just about who interacts with whom, but about why those interactions take the shape they do. Sentiment asymmetries expose the political, cultural, and social frictions that guide attention across Reddit—revealing which communities feel compelled to respond, which become recurring reference points, and where conflict concentrates within the platform.


<div style="max-height: 400px; overflow: auto; border: 2px solid #eee; padding: 8px;">
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>subreddit_A</th>
      <th>subreddit_B</th>
      <th>sentiment_A_to_B</th>
      <th>count_A_to_B</th>
      <th>sentiment_B_to_A</th>
      <th>count_B_to_A</th>
      <th>asymmetry_score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>anarchism</td>
      <td>drama</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>0.016129</td>
      <td>124.0</td>
      <td>10.957349</td>
    </tr>
    <tr>
      <th>1</th>
      <td>subredditdrama</td>
      <td>todayilearned</td>
      <td>0.327660</td>
      <td>235.0</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>-10.909006</td>
    </tr>
    <tr>
      <th>2</th>
      <td>asktrp</td>
      <td>thebluepill</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>0.302326</td>
      <td>215.0</td>
      <td>10.732128</td>
    </tr>
    <tr>
      <th>3</th>
      <td>gaming</td>
      <td>subredditdrama</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.337500</td>
      <td>160.0</td>
      <td>8.902378</td>
    </tr>
    <tr>
      <th>4</th>
      <td>hearthstone</td>
      <td>subredditdrama</td>
      <td>1.000000</td>
      <td>5.0</td>
      <td>0.175258</td>
      <td>97.0</td>
      <td>8.250465</td>
    </tr>
    <tr>
      <th>5</th>
      <td>hearthstone</td>
      <td>hearthstonecirclejerk</td>
      <td>-0.641026</td>
      <td>39.0</td>
      <td>0.562500</td>
      <td>96.0</td>
      <td>-8.072893</td>
    </tr>
    <tr>
      <th>6</th>
      <td>conspiracy</td>
      <td>worldnews</td>
      <td>0.560748</td>
      <td>214.0</td>
      <td>1.000000</td>
      <td>6.0</td>
      <td>-7.760641</td>
    </tr>
    <tr>
      <th>7</th>
      <td>india</td>
      <td>subredditdrama</td>
      <td>1.000000</td>
      <td>6.0</td>
      <td>0.400000</td>
      <td>140.0</td>
      <td>7.745967</td>
    </tr>
    <tr>
      <th>8</th>
      <td>conservative</td>
      <td>subredditdrama</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.445946</td>
      <td>148.0</td>
      <td>7.530623</td>
    </tr>
    <tr>
      <th>9</th>
      <td>conspiracy</td>
      <td>gmomyths</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>0.455782</td>
      <td>147.0</td>
      <td>7.413047</td>
    </tr>
    <tr>
      <th>10</th>
      <td>subredditdrama</td>
      <td>subredditdramadrama</td>
      <td>1.000000</td>
      <td>6.0</td>
      <td>0.509677</td>
      <td>155.0</td>
      <td>7.095201</td>
    </tr>
    <tr>
      <th>11</th>
      <td>sf4</td>
      <td>streetfighter</td>
      <td>1.000000</td>
      <td>6.0</td>
      <td>0.721429</td>
      <td>280.0</td>
      <td>6.731360</td>
    </tr>
    <tr>
      <th>12</th>
      <td>conspiratard</td>
      <td>nolibswatch</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>0.111111</td>
      <td>54.0</td>
      <td>6.572671</td>
    </tr>
    <tr>
      <th>13</th>
      <td>asoiaf</td>
      <td>asoiafcirclejerk</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.597561</td>
      <td>164.0</td>
      <td>6.427517</td>
    </tr>
    <tr>
      <th>14</th>
      <td>badphilosophy</td>
      <td>badphilosophy2</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>-0.411765</td>
      <td>17.0</td>
      <td>6.387488</td>
    </tr>
    <tr>
      <th>15</th>
      <td>mensrights</td>
      <td>twoxchromosomes</td>
      <td>0.315068</td>
      <td>73.0</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>-6.166104</td>
    </tr>
    <tr>
      <th>16</th>
      <td>halo</td>
      <td>halocirclejerk</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.615385</td>
      <td>156.0</td>
      <td>6.094494</td>
    </tr>
    <tr>
      <th>17</th>
      <td>conspiracy</td>
      <td>news</td>
      <td>0.620253</td>
      <td>158.0</td>
      <td>1.000000</td>
      <td>10.0</td>
      <td>-6.085331</td>
    </tr>
    <tr>
      <th>18</th>
      <td>syriancirclejerkwar</td>
      <td>syrianrebels</td>
      <td>0.073171</td>
      <td>41.0</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>-5.950554</td>
    </tr>
    <tr>
      <th>19</th>
      <td>conspiracy</td>
      <td>politics</td>
      <td>0.662500</td>
      <td>160.0</td>
      <td>1.000000</td>
      <td>29.0</td>
      <td>-5.699228</td>
    </tr>
    <tr>
      <th>20</th>
      <td>corejerk</td>
      <td>metalcore</td>
      <td>0.657534</td>
      <td>146.0</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>-5.492294</td>
    </tr>
    <tr>
      <th>21</th>
      <td>the_donald</td>
      <td>topmindsofreddit</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.463415</td>
      <td>82.0</td>
      <td>5.483308</td>
    </tr>
    <tr>
      <th>22</th>
      <td>the_donald</td>
      <td>worldnews</td>
      <td>0.463415</td>
      <td>82.0</td>
      <td>1.000000</td>
      <td>5.0</td>
      <td>-5.483308</td>
    </tr>
    <tr>
      <th>23</th>
      <td>bestof</td>
      <td>drama</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>-0.200000</td>
      <td>20.0</td>
      <td>5.477226</td>
    </tr>
    <tr>
      <th>24</th>
      <td>itspronouncedgif</td>
      <td>writingprompts</td>
      <td>1.000000</td>
      <td>16.0</td>
      <td>-0.666667</td>
      <td>6.0</td>
      <td>5.477226</td>
    </tr>
    <tr>
      <th>25</th>
      <td>metal</td>
      <td>metaljerk</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.738693</td>
      <td>199.0</td>
      <td>5.468776</td>
    </tr>
    <tr>
      <th>26</th>
      <td>bestoflegaladvice</td>
      <td>legaladvice</td>
      <td>0.375000</td>
      <td>64.0</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>-5.393599</td>
    </tr>
    <tr>
      <th>27</th>
      <td>fitnesscirclejerk</td>
      <td>powerlifting</td>
      <td>0.662338</td>
      <td>77.0</td>
      <td>-0.529412</td>
      <td>17.0</td>
      <td>5.349690</td>
    </tr>
    <tr>
      <th>28</th>
      <td>socialism</td>
      <td>subredditdrama</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.588785</td>
      <td>107.0</td>
      <td>5.262520</td>
    </tr>
    <tr>
      <th>29</th>
      <td>magictcg</td>
      <td>magicthecirclejerking</td>
      <td>1.000000</td>
      <td>5.0</td>
      <td>0.727811</td>
      <td>169.0</td>
      <td>5.159776</td>
    </tr>
    <tr>
      <th>30</th>
      <td>bakchodi</td>
      <td>india</td>
      <td>0.592233</td>
      <td>103.0</td>
      <td>1.000000</td>
      <td>16.0</td>
      <td>-5.135956</td>
    </tr>
    <tr>
      <th>31</th>
      <td>guns</td>
      <td>weekendgunnit</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>0.389831</td>
      <td>59.0</td>
      <td>5.089444</td>
    </tr>
    <tr>
      <th>32</th>
      <td>askhistorians</td>
      <td>badhistory</td>
      <td>1.000000</td>
      <td>18.0</td>
      <td>0.486486</td>
      <td>74.0</td>
      <td>5.056049</td>
    </tr>
    <tr>
      <th>33</th>
      <td>conspiracy</td>
      <td>technology</td>
      <td>0.446154</td>
      <td>65.0</td>
      <td>1.000000</td>
      <td>10.0</td>
      <td>-4.989350</td>
    </tr>
    <tr>
      <th>34</th>
      <td>feminism</td>
      <td>mensrights</td>
      <td>1.000000</td>
      <td>9.0</td>
      <td>0.230769</td>
      <td>39.0</td>
      <td>4.937104</td>
    </tr>
    <tr>
      <th>35</th>
      <td>legaladvice</td>
      <td>mensrights</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.071429</td>
      <td>28.0</td>
      <td>4.926121</td>
    </tr>
    <tr>
      <th>36</th>
      <td>libertarian</td>
      <td>politics</td>
      <td>0.544304</td>
      <td>79.0</td>
      <td>1.000000</td>
      <td>10.0</td>
      <td>-4.828196</td>
    </tr>
    <tr>
      <th>37</th>
      <td>civcraft</td>
      <td>civcringe</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>0.644860</td>
      <td>107.0</td>
      <td>4.806482</td>
    </tr>
    <tr>
      <th>38</th>
      <td>thebluepill</td>
      <td>theredpill</td>
      <td>0.428571</td>
      <td>56.0</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>-4.732864</td>
    </tr>
    <tr>
      <th>39</th>
      <td>askreddit</td>
      <td>changemyview</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.076923</td>
      <td>26.0</td>
      <td>4.720775</td>
    </tr>
    <tr>
      <th>40</th>
      <td>joerogan</td>
      <td>joerogan2</td>
      <td>0.931034</td>
      <td>87.0</td>
      <td>0.344262</td>
      <td>61.0</td>
      <td>4.641556</td>
    </tr>
    <tr>
      <th>41</th>
      <td>iamverysmart</td>
      <td>subredditdrama</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>0.492063</td>
      <td>63.0</td>
      <td>4.631070</td>
    </tr>
    <tr>
      <th>42</th>
      <td>femradebates</td>
      <td>femrameta</td>
      <td>1.000000</td>
      <td>7.0</td>
      <td>0.492063</td>
      <td>63.0</td>
      <td>4.631070</td>
    </tr>
    <tr>
      <th>43</th>
      <td>bestof</td>
      <td>india</td>
      <td>0.604651</td>
      <td>86.0</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>-4.603087</td>
    </tr>
    <tr>
      <th>44</th>
      <td>conspiracy</td>
      <td>todayilearned</td>
      <td>0.712000</td>
      <td>125.0</td>
      <td>1.000000</td>
      <td>8.0</td>
      <td>-4.585634</td>
    </tr>
    <tr>
      <th>45</th>
      <td>fitness</td>
      <td>powerlifting</td>
      <td>1.000000</td>
      <td>22.0</td>
      <td>0.297297</td>
      <td>37.0</td>
      <td>4.476792</td>
    </tr>
    <tr>
      <th>46</th>
      <td>enough_sanders_spam</td>
      <td>enoughtrumpspam</td>
      <td>0.404255</td>
      <td>47.0</td>
      <td>1.000000</td>
      <td>5.0</td>
      <td>-4.465355</td>
    </tr>
    <tr>
      <th>47</th>
      <td>bestof</td>
      <td>nostupidquestions</td>
      <td>0.632184</td>
      <td>87.0</td>
      <td>1.000000</td>
      <td>3.0</td>
      <td>-4.427825</td>
    </tr>
    <tr>
      <th>48</th>
      <td>gcdebatesqt</td>
      <td>gendercynical</td>
      <td>1.000000</td>
      <td>5.0</td>
      <td>0.380952</td>
      <td>42.0</td>
      <td>4.339077</td>
    </tr>
    <tr>
      <th>49</th>
      <td>badeconomics</td>
      <td>economics</td>
      <td>0.755725</td>
      <td>131.0</td>
      <td>1.000000</td>
      <td>4.0</td>
      <td>-4.269202</td>
    </tr>
  </tbody>
</table>
</div>

A final piece of the puzzle comes from looking at whether the structural position of a subreddit, how much it is talked about compared to how much it talks about others, relates to asymmetry. While only a couple of communities combine extremely high incoming attention with repeated appearances in asymmetric pairs, a broader pattern still emerges. 
Subreddits that receive a lot of incoming links, the “big fish” of Reddit, are often pulled into asymmetric relationships almost despite themselves, simply because many others talk about them without expecting a response. 
At the same time, being structurally balanced does not guarantee symmetry: some communities sit near the center in terms of incoming and outgoing activity, yet still appear in several asymmetric relationships. The case of India is a good example. Its overall activity looks balanced, but it is repeatedly involved in one-sided interactions. This suggests that asymmetry is not only about volume, but also about who is being talked about, and why.

<details class="plotly-details" data-src="{{ '/assets/plots/structural_skew_vs_asymmetry.html' | relative_url }}" open>
	<summary>Structural Skew vs. Sentiment Asymmetry Involvement</summary>
	<div class="plotly-holder"></div>
</details>


A quick takeaway from this figure is that structural skew and sentiment asymmetry only weakly align.
Most subreddits cluster near zero appearances in top asymmetric pairs, regardless of whether they send or receive more links. A few extreme broadcasters (large negative skew, like <span style="color: #4C72B0; font-weight: 600;">r/subredditdrama</span> or <span style="color: #4C72B0; font-weight: 600;">r/bestof</span>) do appear repeatedly in asymmetric relationships, suggesting that heavy outward activity can amplify sentiment imbalances—but this is not systematic. On the other side, highly visible subreddits with strong incoming attention (positive skew, like <span style="color: #4C72B0; font-weight: 600;">r/worldnews</span> or <span style="color: #4C72B0; font-weight: 600;">r/politics</span>) also appear in asymmetric pairs, yet no clear threshold of prominence guarantees involvement.

<div style="background-color:#F3F8F4; padding:12px 16px; border-radius:6px; margin:1em 0;">
🔑 Overall, the plot reinforces a key point: <strong>sentiment asymmetry is not a direct consequence of structural position.</strong> Visibility and activity shape exposure, but the emergence of asymmetric sentiment depends more on context and topic than on link volume alone.
</div>


### Types of relationships

So far, we have seen that asymmetry on Reddit does not arise randomly: it is shaped by who speaks, who gets talked about, and how attention is distributed across communities. But asymmetry alone does not tell the whole story. Two asymmetric relationships can look very different depending on tone, direction, and response. To better understand these differences, we now shift focus to the **types of relationships** that emerge from asymmetric interactions.

The figure below provides an overview of these relationship types by categorizing subreddit pairs according to the direction and polarity of sentiment exchanged between them, offering a high-level map of how asymmetric sentiment manifests across the platform.


<details class="plotly-details" data-src="{{ '/assets/plots/relationship_type_distribution.html' | relative_url }}" open>
	<summary>Distribution of Relationship Types</summary>
	<div class="plotly-holder"></div>
</details>

The figure summarizes the distribution of relationship types obtained from our pairwise classification procedure. Each subreddit pair is assigned to a category based on **(i) the direction and polarity of average sentiment in each direction** and **(ii) whether link activity is effectively one-sided**, defined by a dominance threshold on directional mention counts.

The bar chart shows the absolute number of pairs in each relationship category (on a logarithmic scale), while the accompanying pie chart presents the same breakdown as percentages. Together, these visualizations provide a compact overview of how asymmetric and mutual sentiment relationships are distributed across the Reddit network under this taxonomy.


### Do One-Sided Attacks “sound” different?

**How do interactions look like ?**

After identifying asymmetric relationships, we now focus on one-sided attacks and ask whether they carry a distinctive linguistic signature. Rather than looking at sentiment alone, we examine how language itself changes when hostility flows mostly in one direction. The idea is simple: if one-sided attacks are a specific interaction pattern, they should also sound different in the way they are written.

As a first step, we examine which textual features are most informative for distinguishing between **ALL** relationship types. Using a random forest classifier, we estimate feature importance to identify which aspects of language contribute most to separating different kinds of inter-subreddit relationships. This view offers an intuitive way to see which linguistic signals—ranging from sentiment cues to stylistic markers—help differentiate the various forms of hostility, neutrality, and positivity observed across communities.


<details class="plotly-details-png" open>
  <summary>Top 20 Most Features for Classifying Relationship Types</summary>
  <img src="{{ site.baseurl }}/assets/plots/relationship_type_feature_importance.png" alt="relationship_type_feature_importance" width="100%">
</details>

Here, we can already highlight a few key results. The features with the strongest impact on relationship types are not only sentiment-related, but also structural and stylistic. Measures such as the fraction of uppercase letters, special characters, text length, and readability consistently rank among the most influential, suggesting that polarized or one-sided interactions tend to come with more emphatic and marked writing styles. At the same time, sentiment indicators (both global and negative scores) remain important, confirming that tone still plays a central role in distinguishing different kinds of relationships. Overall, this shows that relationship asymmetry is reflected not just in what sentiment is expressed, but also in how messages are written, a signal that linguistic form and emotional content go hand in hand.

These results will help us choose what category of features we actually care about.

**What is LIWC?**

LIWC (Linguistic Inquiry and Word Count) is a lexicon-based text analysis framework designed to quantify linguistic and psychological patterns in written language.

- It maps words to predefined linguistic and psychological categories (e.g. affect, anger, social processes, cognitive mechanisms) using validated dictionaries.

- Each text is transformed into numerical features representing the relative frequency of these categories, enabling systematic comparison across messages or groups.

- Unlike topic-based methods, LIWC captures how language is used rather than what is discussed, focusing on style, emotional tone, and cognitive framing.

- In our analysis, LIWC features provide complementary signals to sentiment labels, helping distinguish different types of relationships by their expressive and emotional characteristics.


### Features in Hostile interactions 
We now turn to the language patterns associated with **hostile interactions**, focusing on links that fall into one-sided negative, opposite polarity, or mutual negative relationships.

<details class="plotly-details-png" open>
  <summary>Top 15 Features(LIWC subset): Lasso vs. Ridge(one-sided (neg), opposite polarity, mutual negative)</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/top_features_lasso_vs_ridge.png" alt="top20_most_asymmetric_subreddit_pairs" width="70%">
  </div>
</details>


Beyond the expected emotional markers, a striking result is the strong influence of **non-LIWC features**. Measures such as readability, message length, sentence complexity, and character-level statistics consistently rank among the most important signals. This suggests that hostile interactions are not only emotionally charged, but also **structurally different**: they tend to be longer, denser, and more carefully constructed, resembling arguments or justifications rather than spontaneous reactions. In other words, hostility here often comes with effort—users take time to explain, argue, and insist.

Within the LIWC categories, some dimensions stand out more than others. **Cognitive process features**(such as CogMech) play a notable role, indicating language focused on reasoning, causation, and explanation (“because”, “should”, “know”). This aligns with the idea that negative or conflictual exchanges frequently involve attempts to rationalize a position or challenge another one. At the same time, the presence of anger-related features is expected in hostile interactions, but what stands out is how strongly they contribute when combined with other signals. Rather than appearing in isolation, they come together with structural and cognitive markers, amplifying their impact. This suggests that hostile links are not simply driven by emotional reactions, but by messages where negative emotion is embedded in more deliberate, structured, and cognitively engaged discourse, reinforcing the overall intensity of the interaction.


### One-sided vs. mutual hostilities
To better understand how hostility operates, we move beyond simply identifying negative interactions and compare two distinct situations: **one-sided negative attacks and mutual negative exchanges.**

The goal is to see whether these two forms of conflict rely on the same linguistic signals or whether they differ in intensity, structure, or emotional composition. By focusing on LIWC-based features, we can examine how emotional and cognitive cues vary depending on whether negativity is sustained by a single side or shared between both communities.

<details class="plotly-details-png" open>
  <summary>LIWC Differences One-sided vs. Mutual Negative</summary>
  <img src="{{ site.baseurl }}/assets/plots/liwc_differences_one_sided_vs_mutual_negative.png" alt="liwc_differences_one_sided_vs_mutual_negative" width="100%">
</details>

Clear and statistically meaningful differences emerge between one-sided and mutual negative interactions. One-sided negativity carries a **stronger emotional load**, with higher levels of negative affect across multiple LIWC categories. Notably, **LIWC_Negemo** is significantly higher in one-sided links (0.0596 vs. 0.0491; Cliff’s δ = 0.118, q < 0.001), with similar effects for **LIWC_Affect** (δ = 0.090) and **LIWC_Anger** (δ = 0.087). Together, these results indicate that unilateral hostility is more emotionally intense and expressive.
Mutual negative exchanges, by contrast, show slightly higher use of **cognitive and explanatory language**, such as **LIWC_Cause** and **LIWC_Certain** (|δ| ≈ 0.04), consistent with more argumentative or justificatory interactions. Pronoun usage reinforces this distinction: one-sided negativity involves fewer references to collective or third-party actors (e.g., **LIWC_They**, δ = −0.056), while mutual negativity more often reflects direct engagement between groups.

<div style="background-color:#F3F8F4; padding:12px 16px; border-radius:6px; margin:1em 0;">
🔑 Overall, these findings show that polarity asymmetry is not only structural but also linguistic. One-sided attacks are marked by heightened emotional expression, whereas mutual hostility appears more constrained and dialogical—resembling reactive back-and-forth exchanges rather than sustained unilateral criticism.
</div>



### Who are the Attackers, the Receivers, and the Peaceful ones?

If asymmetry shapes how communities relate to one another, a natural question follows: **who is doing the attacking, who bears the brunt of it, and who manages to stay out of the fray altogether?** In this section, we shift focus from relationships to roles, separating negative sentiment sent from negative sentiment received. By looking at where hostility originates and where it concentrates, we begin to see how different communities position themselves within Reddit’s landscape of conflict—and how unevenly that conflict is experienced across the platform.

### The Geography of Online Hostility

<div style="background-color:#f6f8fa; padding:12px 16px; border-radius:6px; margin:1em 0;">
<strong>Why start with countries?</strong><br>
National subreddits offer a natural entry point because they are built around shared identity and a strong sense of belonging. Discussions in these spaces often blend news, culture, and politics, making them especially likely to attract emotionally charged reactions—both from insiders and from outsiders. As collective symbols rather than niche interests, country-based communities are also more visible and more frequently referenced across Reddit, which makes them useful lenses for observing how sentiment, criticism, and affiliation travel through the platform.
</div>


<details class="plotly-details-png" open>
  <summary>Top 10 Country Subreddits by Negative Incoming vs. Outgoing Posts</summary>
  <img src="{{ site.baseurl }}/assets/plots/negative_country_incoming_outgoing.png" alt="negative_country_incoming_outgoing" width="100%">
</details>


<details class="plotly-details-png" open>
  <summary>Top 10 Country Subreddits by Negative Outgoing vs. Incoming Ratio</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/negative_country_out_vs_in_ratio.png" alt="negative_country_out_vs_in_ratio" width="80%"></div>
</details>

The ratio plot makes this imbalance explicit. Some communities direct a disproportionately large share of negativity outward compared to how much they absorb, while others accumulate negative attention without responding in kind. This asymmetry suggests that country subreddits do not simply **“trade”** hostility with the rest of Reddit.


### Temporal Roles in the Network

Reddit’s cross-subreddit activity grows steadily over time, while the overall level of negative sentiment remains largely stable, with only small oscillations. 

<details class="plotly-details-png" open>
  <summary>Number of Hyperlinks over Time(Monthly) & Percentage of Negative Links over Time(Monthly)</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/temporal_statistics_network_growth.png" alt="temporal_statistics_network_growth" width="80%">
  </div>
</details>

<details class="plotly-details-png" open>
  <summary>Number of Attackers/Receivers over Time</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/role_counts_over_time.png" alt="role_counts_over_time" width="80%">
  </div>
</details>

However, roles change inside the community. To move beyond static snapshots, we classified each subreddit month by month as an **attacker**, a **receiver**, or **balanced**—depending on whether it sent more negative links than it received, absorbed more than it sent, or remained roughly even.
This temporal perspective invites a natural question: **are these roles temporary reactions, or do some communities consistently play the same part?**

The results point to clear patterns. A small group of subreddits emerges as persistent attackers, most notably **r/subredditdrama** and **r/drama**, which act as sources of negative links in a large majority of observed months. Their behavior is strikingly stable over time, suggesting a structural role centered on commentary and critique rather than episodic conflict.

On the receiving end, communities such as **r/news**, **r/worldnews**, **r/videos**, **r/funny**, and **r/shitpost** appear repeatedly as persistent receivers, accumulating negative attention across most periods while rarely initiating it themselves. These are highly visible content hubs—places that attract scrutiny simply by virtue of being widely referenced.

Between these two extremes lies a more volatile group, including **r/pics**, **r/circlebroke**, **r/conspiracy**, and **r/politics**. These subreddits frequently shift roles from month to month, alternating between attacking, receiving, and balanced states as external events reshape discussion. Their behavior reflects a more context-dependent dynamic, where polarity intensifies or fades in response to news cycles, political developments, or platform-wide debates.


### Who Sits at the Center? Network Centrality by Role

<details style="margin-top: 12px; margin-buttom: 22px;">
<summary style="font-weight: bold;">What is PageRank?</summary>
PageRank is a centrality measure that identifies the most influential nodes in a network. 
It was originally developed by Google to rank web pages.<br>

Concept: 
A node is important if it is linked to by other important nodes.<br>

Formula: 
$$
PR(i) = \frac{1-d}{N} + d \sum_{j \in M(i)} \frac{PR(j)}{L(j)}
$$

<ul>
  <li>\( N \): total nodes</li>
  <li>\( d \): damping factor (≈ 0.85)</li>
  <li>\( M(i) \): nodes linking to \( i \)</li>
  <li>\( L(j) \): outlinks from node \( j \)</li>
</ul>

</details>


<details class="plotly-details-png" open>
  <summary>Network Centrality by Role (PageRank Distribution)</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/pagerank_by_role.png" alt="pagerank_by_role" width="80%">
  </div>
</details>

This figure compares the PageRank distributions of subreddits classified as attackers, receivers, or balanced. Subreddits that act as attackers or receivers tend to occupy more central positions in the network, with higher and more dispersed PageRank values, reflecting their stronger integration into cross-subreddit linking patterns. In contrast, balanced subreddits cluster at much lower PageRank levels, indicating a more peripheral role. Together, these distributions suggest that polarity asymmetry is closely tied to network visibility: communities most involved in sending or receiving negativity are also those that sit closest to the structural core of the Reddit network.


<!-- ### Do asymmetries and link sentiment tend to change over time?
Finally, we look at how asymmetric relationships evolve between 2014 and 2017: does the number of one-sided hostilities increase or decrease? do certain subreddits keep the same role over years, or do they switch from peaceful to attacker, from receiver to mutual hostile? -->


### Conclusion

Reddit has a reputation for being loud, chaotic, and perpetually angry. And yes—there is plenty of negativity. But when we zoom out, what we find is not a constant shouting match. It’s something far more organized.

Asymmetry is the rule, not the exception. Most interactions are one-sided, usually positive, and surprisingly calm. When negativity does appear, it’s rarely a two-sided brawl. More often, it’s one subreddit throwing a punch while the other keeps scrolling.

A small cast of familiar characters shows up again and again: reliable critics who never miss an opportunity to comment, highly visible hubs that absorb attention whether they want it or not, and a rotating middle group that flares up whenever the news cycle demands it. These roles persist over time, even as Reddit itself grows larger and busier—suggesting that some communities are not having bad days so much as being who they are.

Even the language gives the game away. One-sided attacks are more emotional, more expressive, and less interested in explaining themselves. Mutual hostility, when it happens, sounds more like an argument than an outburst—less **“drive-by insult,”** more **“lengthy comment thread.”**

So if Reddit sometimes feels hostile, it’s not because everyone is fighting everyone all the time. It’s because attention is uneven, visibility attracts criticism, and some communities are simply very good at yelling into the void—while others have learned to live there.

<div style="background-color:#F3F8F4; padding:12px 16px; border-radius:6px; margin:1em 0;">📌In short: Reddit isn’t pure chaos. It’s structured chaos. And once you see the pattern, you can’t unsee it.</div>







<script>
document.querySelectorAll(".plotly-details").forEach(details => {
	details.addEventListener("toggle", e => {
		const holder = details.querySelector(".plotly-holder");
    if (!holder) return;

    if (details.open) {
			if (!holder.firstChild) {
				const container = document.createElement("div");
        container.style.width = "100%";
        container.style.overflow = "hidden";
        container.style.position = "relative";

        const iframe = document.createElement("iframe");
        iframe.src = details.dataset.src;
        iframe.loading = "lazy";
        iframe.width = "100%";
        iframe.height = "1"; // temporary, will resize on load
        iframe.frameBorder = "0";
        iframe.style.display = "block";
        iframe.style.border = "0";
        iframe.style.overflow = "hidden";

        iframe.onload = () => {
					try {
						const doc = iframe.contentDocument || iframe.contentWindow.document;
            const plotDiv = doc.querySelector(".plotly-graph-div");
            if (plotDiv) {
							const height = plotDiv.scrollHeight;
              iframe.style.height = (20+height) + "px";
            }
          } catch (err) {
						console.warn("Cannot access iframe content due to cross-origin restrictions");
          }
        };

        container.appendChild(iframe);
        holder.appendChild(container);
      }
    } else {
			holder.innerHTML = "";
    }
  });
});
</script>