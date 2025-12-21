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
  <summary style="color:#FFF">Miniature Universe</summary>

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

<div class="dialogue">
  <div class="bubble">
    What if we could uncover not just who speaks, but who speaks about whom, and in what tone?
  </div>

  <div class="bubble">
    What if we could map Reddit not as a collection of isolated forums, but as a living ecosystem of communities reacting to each other in real time?
  </div>

  <div class="bubble">
    Could Reddit’s community dynamics resemble those of our real-world society?
  </div>
</div>


By analyzing millions of directed links enriched with sentiment, we can finally explore these hidden dynamics: which groups attract admiration, which spark conflicts, which act as hubs of attention, and which are talked about far more than they ever reply.

Reddit is a vast collection of communities, called subreddits, where millions of users gather around topics ranging from news and science to gaming, culture, or niche interests. The visualization above maps this landscape by grouping subreddits according to their themes and audiences: each point is a community, and those with similar content naturally cluster into regions like gaming, Europe, STEM, or Anime. 
Rather than a chaotic list of forums, Reddit appears as a structured ecosystem with its own cultural zones. In this project, we aim to explore a small but revealing part of this universe, uncovering the hidden dynamics that shape how these communities relate to one another.

This is where the best data analysts of the universe [we]({{ "/about/" | relative_url }}) come in action.

### Dataset

If you’re curious about the dataset behind our analysis, here’s what makes it special. We used the Reddit Hyperlink Network dataset, which collects cross-subreddit mentions recorded between 2014 and 2017. Every time a post in one subreddit links to another, it produces a directional connection with a timestamp and a sentiment label indicating whether the interaction was positive or negative. In addition, each link carries linguistic information drawn from the text of the post, giving insight into tone, emotion, and expression… but we’ll come back to these features later on for a deeper explanation. 
Taken together, these elements allow us to view Reddit not as isolated forums, but as a dynamic network of relationships in which communities mention, respond to, or overlook one another. By analyzing this web of interactions, we can explore how groups engage across topics and over time, offering a richer understanding of social behavior on the platform.

Here are the key numbers that shape our dataset.

**[enter numbers]**
<div style="text-align: center; margin: 20px 0;">
  <table style="margin: 0 auto;">
    <tr>
      <th align="center">Keys</th>
      <th align="center">Numbers</th>
    </tr>
    <tr>
      <td align="center">Total Subreddits</td>
      <td>858,488</td>
    </tr>
    <tr>
      <td align="center">Unique Pairs</td>
      <td>309,667</td>
    </tr>
    <!-- <tr>
      <td align="center">Asymmetric Pairs</td>
      <td>6,508</td>
    </tr> -->
  </table>
</div>



Before diving deeper into the structure of Reddit’s interactions, let’s start with a simple overview of general sentiment across all hyperlinks: only about 10% of cross-subreddit mentions carry a negative tone, while the vast majority remain positive or neutral. This broad snapshot might suggest that the overall atmosphere on Reddit is mostly calm and positive, but as our analysis will show, things are far more complex beneath the surface.

<details class="plotly-details" data-src="{{ '/assets/plots/sentiment_distribution_plot_web.html' | relative_url }}" open>
	<summary>Sentiment Distribution</summary>
	<div class="plotly-holder"></div>
</details>

### Mapping Asymmetric Relationships

Before diving into the nuances of sentiment and motivation, we start by mapping how unevenly subreddits interact with one another. Some communities attract enormous attention, whether admiration, mockery, or criticism, while barely replying at all, whereas others send out thousands of links without receiving much back. By examining these imbalances in incoming vs. outgoing mentions, we can uncover which subreddits become frequent targets, which ones act as loud broadcasters, and how these asymmetries lay the groundwork for the deeper relational patterns we analyze next.

**A First Look--Who talks much more than they listen—and what does that reveal?**

<details class="plotly-details" data-src="{{ '/assets/plots/subreddit_most_asymmetric_in_outgoing_links.html' | relative_url }}" open>
	<summary>Subreddits with Most Asymmetric Incoming vs Outgoing Links</summary>
	<div class="plotly-holder"></div>
</details>

When we compare how often communities mention others versus how often they are mentioned themselves, striking patterns emerge. 

Already, one pattern stands out: ***r/AskReddit*** receives an enormous amount of incoming links, which makes sense for a community built around asking questions that many other subreddits reference. But on the opposite side, the subreddit that sends out the most links is ***r/subredditdrama***, a community literally dedicated to pointing at conflicts elsewhere on Reddit. 

Even before diving deeper, we can already see the contrast between hubs of curiosity and hubs of commentary. These contrasts reveal early hints of Reddit’s internal dynamics, where some communities become magnets for discussion while others act as active commentators on the rest of the ecosystem. 


<div style="background-color:#f6f8fa; padding:12px 16px; border-radius:6px; margin:1em 0;">
<strong>🔍 Before going any further, it’s important to explain how this asymmetry score is computed, since it’s the backbone of all the results that follow.</strong>
</div>



### Pairwise Sentiment and Asymmetry Computation

We model interactions between subreddits as directed edges with associated sentiment.  
Each Reddit post linking from a source subreddit to a target subreddit is treated as one observation with sentiment in {−1, +1}.

For every unordered pair of subreddits {A, B}, we compute sentiment statistics in both directions:

<table>
  <tr>
    <th align="center">Direction</th>
    <th align="center">Definition</th>
  </tr>
  <tr>
    <td align="center">A → B</td>
    <td>sentiment of all links from A to B</td>
  </tr>
  <tr>
    <td align="center">B → A</td>
    <td>sentiment of all links from B to A</td>
  </tr>
</table>

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


**Who talks much more than they listen—and what does that reveal?**

With this score in hand, we can now identify which subreddit pairs stand out as the most asymmetric. Some communities consistently direct strong sentiment toward specific targets, allowing us to form a first picture of where the sharpest imbalances on Reddit actually lie.

<details class="plotly-details-png" open>
  <summary>Top 20 Most Asymmetric Subreddit Pairs</summary>
  <img src="{{ site.baseurl }}/assets/plots/top20_most_asymmetric_subreddit_pairs.png" alt="top20_most_asymmetric_subreddit_pairs" width="100%">
</details>


To understand what these asymmetric relationships actually look like, we break them down using a few key features. **`sentiment_A_to_B`** and **`sentiment_B_to_A`** tell us whether references between two communities lean positive or negative. We tend to compare the two values.  And **`count_A_to_B`** and **`count_B_to_A`** show how frequently the two sides talk about each other, crucial for distinguishing a meaningful pattern from a coincidence. And the final asymmetry score summarizes how much louder one side is compared to the other.
Looking through the strongest pairs, several examples stand out. <span style="color: #4C72B0; font-weight: 600;">r/India → r/subredditdrama</span> appears almost one-sidedly positive: India sends consistently positive references, yet <span style="color: #4C72B0; font-weight: 600;">r/subredditdrama</span> responds with a much larger volume of mentions whose average sentiment sits around **0.4**. It raises the possibility that India becomes a recurring subject of jokes, criticism, or social commentary, a dynamic that fits with how large national communities often become meme targets on Reddit.


Another telling case is <span style="color: #4C72B0; font-weight: 600;">r/the_donald → r/worldnews</span>. This dataset spans the 2016 U.S. presidential election, a period when political tensions spilled across the entire platform. Seeing The_Donald talk disproportionately about worldnews is unsurprising: users in a partisan political space often scrutinize mainstream news outlets (in particular when related to Donald Trump), sometimes with hostility, which creates a clear imbalance in attention.
A third example, <span style="color: #4C72B0; font-weight: 600;">r/feminism → r/mensrights</span>, reflects a worldwide general subject. Feminism shows a relatively positive or neutral tone toward mensrights, while the reverse direction often carries harsher sentiment. This asymmetry mirrors real-world conflicts between the two movements, in which each side reacts to the other through criticism, stereotypes, or counter-arguments, yet sometimes with differing levels of intensity.
Together, these pairs illustrate why asymmetry matters: it is not just about who talks more, but about the cultural, political, and social frictions that shape how communities choose their targets, and how loudly they decide to speak.


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

### Types of relationships

So far, we have seen that asymmetry on Reddit does not arise randomly: it is shaped by who talks, who gets talked about, and how attention is distributed across communities. But asymmetry alone does not tell the whole story. Two asymmetric relationships can look very different depending on tone, direction, and response. To better understand what these imbalances actually mean, we now turn to the nature of the relationships themselves.
Looking at the overall distribution, a clear pattern emerges: most asymmetric relationships are one-sided and positive, where one community frequently references another in a favorable or neutral way without much reaction in return. Mutual positivity is also relatively common, while mutual negativity is extremely rare. This tells us that most of Reddit is not in constant war, but when we do see extreme polarity differences, they are more often due to one side throwing rocks than two sides shouting at each other .When strong negativity appears, it is far more often unilateral than reciprocal, suggesting that Reddit is less dominated by ongoing feuds than by isolated communities directing criticism toward others, often without triggering a direct confrontation.


<details class="plotly-details" data-src="{{ '/assets/plots/relationship_type_distribution.html' | relative_url }}" open>
	<summary>Distribution of Relationship Types</summary>
	<div class="plotly-holder"></div>
</details>



### Do One-Sided Attacks “sound” different?

**How do interactions look like ?**

After identifying asymmetric relationships, we now focus on one-sided attacks and ask whether they carry a distinctive linguistic signature. Rather than looking at sentiment alone, we examine how language itself changes when hostility flows mostly in one direction. The idea is simple: if one-sided attacks are a specific interaction pattern, they should also sound different in the way they are written.

Looking at which textual features matter most for distinguishing relationship types already provides useful insight. Some patterns consistently appear in one-sided attacks, suggesting that these interactions follow recognizable linguistic dynamics rather than occurring at random. This highlights that asymmetry is not only a structural phenomenon, but is also reflected in the way interactions are expressed—an aspect we will examine more closely in the next section.

<details class="plotly-details-png" open>
  <summary>Top 20 Most Features for Classifying Relationship Types</summary>
  <img src="{{ site.baseurl }}/assets/plots/relationship_type_feature_importance.png" alt="relationship_type_feature_importance" width="100%">
</details>

Here, we can already highlight a few key results. The features with the strongest impact on relationship types are not only sentiment-related, but also structural and stylistic. Measures such as the fraction of uppercase letters, special characters, text length, and readability consistently rank among the most influential, suggesting that polarized or one-sided interactions tend to come with more emphatic and marked writing styles. At the same time, sentiment indicators (both global and negative scores) remain important, confirming that tone still plays a central role in distinguishing different kinds of relationships. Overall, this shows that relationship asymmetry is reflected not just in what sentiment is expressed, but also in how messages are written, a signal that linguistic form and emotional content go hand in hand.


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


### One-sided vs mutual hostilities
To better understand how hostility operates, we move beyond simply identifying negative interactions and compare two distinct situations: **one-sided negative attacks and mutual negative exchanges.**

The goal is to see whether these two forms of conflict rely on the same linguistic signals or whether they differ in intensity, structure, or emotional composition. By focusing on LIWC-based features, we can examine how emotional and cognitive cues vary depending on whether negativity is sustained by a single side or shared between both communities.

<details class="plotly-details-png" open>
  <summary>LIWC Differences One-sided vs. Mutual Negative</summary>
  <img src="{{ site.baseurl }}/assets/plots/liwc_differences_one_sided_vs_mutual_negative.png" alt="liwc_differences_one_sided_vs_mutual_negative" width="100%">
</details>

Several patterns emerge from this comparison. One-sided negative interactions tend to exhibit **higher levels** of **negative affect** and **broader emotional load**, with distributions shifted upward for categories such as negative emotion and general affect. Mutual negative exchanges, while still hostile, show slightly lower medians and more compact spreads, suggesting **more constrained** or **reactive forms of negativity**. In contrast, features related to explanation and reasoning, such as causal or certainty-related markers, are relatively more present in mutual hostility, indicating exchanges that resemble argumentative back-and-forth rather than prolonged unilateral criticism. Together, these differences highlight that one-sided attacks are not only asymmetric in structure, but also in how emotional and cognitive signals are deployed.


### Who are the Attackers, the Receivers, and the Peaceful ones?

<details class="plotly-details-png" open>
  <summary>Top 10 Country Subreddits by Negative Incoming vs. Outgoing Posts</summary>
  <img src="{{ site.baseurl }}/assets/plots/negative_country_incoming_outgoing.png" alt="negative_country_incoming_outgoing" width="100%">
</details>


<details class="plotly-details-png" open>
  <summary>Top 10 Country Subreddits by Negative Outgoing vs. Incoming Ratio</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/negative_country_out_vs_in_ratio.png" alt="negative_country_out_vs_in_ratio" width="80%"></div>
</details>


### Hierarchy: Who shapes the landscape?

<details class="plotly-details-png" open>
  <summary>Number of Hyperlinks over Time(Monthly) & Percentage of Negative Links over Time(Monthly)</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/temporal_statistics_network_growth.png" alt="temporal_statistics_network_growth" width="80%">
  </div>
</details>

Beyond roles, some communities are structurally central in the network: they receive links from many other subreddits and have high PageRank or in-degree. When we cross roles with centrality, we can see: whether receivers tend to be big, whether attackers are more peripheral communities, whether peaceful communities play a central role in information flow.

<details class="plotly-details-png" open>
  <summary>Network Centrality by Role (PageRank Distribution)</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/pagerank_by_role.png" alt="pagerank_by_role" width="80%">
  </div>
</details>


### Do asymmetries and link sentiment tend to change over time?
Finally, we look at how asymmetric relationships evolve between 2014 and 2017: does the number of one-sided hostilities increase or decrease? do certain subreddits keep the same role over years, or do they switch from peaceful to attacker, from receiver to mutual hostile?

<details class="plotly-details-png" open>
  <summary>Number of Attackers/Receivers over Time</summary>
  <div style="text-align: center;"><img src="{{ site.baseurl }}/assets/plots/role_counts_over_time.png" alt="role_counts_over_time" width="80%">
  </div>
</details>



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