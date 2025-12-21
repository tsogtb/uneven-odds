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

---

## 1. Hook: The Opening Scene
**Goal**: Grab attention with a compelling, concrete example

**Content**:
- Opening line: "r/blackout2015 links to r/shittheadminssay with 100% negative sentiment across all 3 interactions. But when we look the other way, r/shittheadminssay links back with 100% positive sentiment across all 4 interactions. This is a one-sided war with an asymmetry score of 2.000—the most extreme case in our entire dataset."
- Visual: Interactive network diagram highlighting this extreme asymmetric pair
- Key Metrics: Maximum asymmetry score = 2.000, 619,334 unique subreddit pairs analyzed, 59,952 bidirectional pairs

---

## 2. Setting the Stage: Understanding the Reddit Hyperlink Network
**Goal**: Help readers understand what we're analyzing

**Content**:
- What is a hyperlink network?: Subreddits mention/link to each other in posts
- The Data: 858,488 hyperlinks, 67,180 subreddits, 2014-2017, 65 LIWC features
- Visual: Timeline showing network growth (31 → 7,112 subreddits), sentiment distribution (90% positive)

---

## 3. The Discovery: What Are Polarity Asymmetries?
**Goal**: Define the core concept clearly

**Content**:
- Definition: Asymmetric relationships where sentiment A→B ≠ B→A
- Types: Various asymmetry types including one-sided negative (A→B negative, B→A positive/neutral), one-sided positive, mutual positive, mutual negative, and unidirectional relationships
- Key Finding: Out of 619,334 unique pairs, only 59,952 have links in both directions—most relationships are unidirectional
- Visual: Side-by-side comparison diagrams, scatter plot (sentiment A→B vs. B→A), asymmetry type distribution chart

---

## 4. Research Question 1: Finding the Most Asymmetric Pairs
**Goal**: Answer "Which pairs show strongest asymmetries?"

**Content**:
- Method: Analyzed 619,334 unique subreddit pairs, calculated asymmetry scores based on sentiment differences
- Results: Top 20 most asymmetric pairs identified, with blackout2015 ↔ shittheadminssay having the maximum asymmetry score of 2.000
- Key Insight: Most extreme asymmetries occur when one subreddit is completely negative (sentiment = -1.0) while the other is completely positive (sentiment = +1.0)
- Visual: Bar chart of top pairs, scatter plot with asymmetry scores, network subgraph highlighting extreme pairs

**ML Enhancement**:
- Random Forest regression achieves R² = 0.9996, Linear Regression achieves R² = 0.6402
- Network centrality and activity patterns are strong predictors of asymmetry scores
- Feature importance plot shows which network features matter most
- Predicted vs. actual scores visualization demonstrates model accuracy

---

## 5. Research Question 2: The Language of Conflict
**Goal**: Answer "Are one-sided hostilities different in nature from mutual hostilities?"

**Content**:
- Method: Used pair-level features (asymmetry scores, sentiment differences, link patterns) to classify one-sided hostilities vs. other relationship types
- Results: Pair-level features can effectively distinguish one-sided hostilities from other asymmetry types
- Key Features: Asymmetry score, sentiment differences, link ratios, and link imbalance are most important
- Visual: Feature importance plot, confusion matrix, classification performance metrics

**ML Enhancement**:
- Classification model (Random Forest and Logistic Regression) using pair-level features
- Feature importance shows asymmetry score and sentiment differences are strongest predictors
- High precision and recall for identifying one-sided hostilities
- Simplified approach using already-computed pair statistics (much faster than aggregating LIWC features)

---

## 6. Research Question 3: Network Roles and Impact
**Goal**: Answer "What impact do polarity asymmetries have on the broader network?"

**Content**:
- Subreddit Roles: 165 attackers, 146 receivers, 7,332 peaceful, 44 mutual hostile, 1,954 mixed, 967 balanced, 56,572 inactive
- Key Finding: Most subreddits (84%) are inactive or peaceful—only a small fraction engage in hostile behavior
- Network Centrality: Activity rates (outgoing/incoming negative rates) are key predictors of roles
- Visual: Network diagram colored by role, centrality vs. role scatter plot, role distribution pie chart

**ML Enhancement**:
- Classification model predicting subreddit roles with varying performance across classes
- Highest precision for peaceful subreddits (96.2%) and attackers (74.4%)
- Feature importance: Outgoing negative rate (44.6%) and incoming negative rate are strongest predictors
- Network centrality features (PageRank, in-degree, out-degree) can be added for enhanced prediction

---

## 7. The Bigger Picture: What This Tells Us
**Goal**: Synthesize findings

**Content**:
- Key Findings: 
  - Extreme asymmetries are rare but highly visible (maximum score of 2.000)
  - Most relationships are unidirectional (only 9.7% of pairs have bidirectional links)
  - Pair-level features (sentiment differences, link patterns) effectively distinguish one-sided hostilities
  - Network roles are predictable: 84% of subreddits are inactive/peaceful, only 0.3% are attackers/receivers
  - ML models achieve excellent performance (R² = 0.9996 for asymmetry prediction)
- Implications: 
  - Asymmetric power dynamics exist but are uncommon
  - Most Reddit communities maintain neutral or positive relationships
  - Network structure and activity patterns are strong predictors of behavior
  - One-sided hostilities can be identified using simple pair-level statistics
- Future Research: Why do extreme asymmetries form? Do they escalate over time? What prevents subreddits from responding to negative links?

---

## 8. Methodology & Technical Details
**Goal**: Provide transparency

**Content**:
- Data: Reddit Hyperlink Network (2014-2017)
- Methods: Asymmetry scores, statistical tests, network analysis, ML models
- Code: Link to GitHub
- Limitations: Very few mutual hostilities, class imbalance

---

## Visual Design Guidelines

### Color Scheme
- One-sided hostilities: Red/Orange
- Peaceful/Positive: Green/Blue
- Network nodes: Size = centrality, Color = role

### Interactive Elements
- Hover tooltips on network nodes
- Filterable tables
- Interactive scatter plots
- Timeline slider (if temporal analysis)

---

## Key Metrics to Highlight
- 858,488 hyperlinks analyzed
- 67,180 subreddits in the network
- 619,334 unique subreddit pairs
- 59,952 bidirectional pairs (pairs with links in both directions)
- 2.000 maximum asymmetry score (blackout2015 ↔ shittheadminssay)
- 165 attacker subreddits (primarily send negative links)
- 146 receiver subreddits (primarily receive negative links)
- 7,332 peaceful subreddits (low negative rates in both directions)
- 44 mutual hostile subreddits (high negative rates in both directions)
- ML Model Performance: R² = 0.9996 for asymmetry prediction (Random Forest)

---

## Story Flow
1. Hook → Extreme example
2. Context → Data understanding
3. Definition → Core concept
4. RQ1 → Discovery
5. RQ2 → Deep dive
6. RQ3 → Big picture
7. Synthesis → Meaning
8. Methods → Transparency

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
