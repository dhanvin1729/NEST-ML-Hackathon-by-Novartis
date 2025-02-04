from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np

def clean_string(input_string):
    input_string = input_string.replace("\n", "")
    input_string = input_string.strip()
    if input_string.startswith("'") and input_string.endswith("'"):
        input_string = input_string[1:-1]
    return input_string

def find_similar_indices(study_title,nct_id,df,df2, top_n):
    
    results={}
 
    query_indices=[]
    if(nct_id):
        query_indices = df.index[df['nct_id'] == nct_id].tolist()
        query_index = query_indices[0]
    else:
        study_title=clean_string(study_title)
        query_indices = df.index[df['Study Title'] == study_title].tolist()
        if query_indices:
            query_index = query_indices[0]
        else:
            results['error']="Ensure the inputs are valid."

    if query_index is None:
        results['error']='Sorry Query index not found'
    else:
        valid_indices = (
            df2['final_embeddings'].notna() 
            # df['criteria'].notna() &
            # df['Phases'].notna() &
            # df['Interventions'].notna() &
            # df['Conditions'].notna()
        )
        query_embedding = np.array(list(map(float, df2['final_embeddings'][query_index].strip("[]").split()))).reshape(1, -1)
        similarities = [
            cosine_similarity(
                query_embedding,
                np.array(list(map(float, df2['final_embeddings'][i].strip("[]").split()))).reshape(1, -1)
            )[0][0]
            for i in range(len(df2)) if valid_indices[i]
        ]


        similar_indices = np.argsort(similarities)[-top_n-1:-1][::-1]  
        similar_scores = [similarities[i] for i in similar_indices]

        results = {'Query Trial': df.iloc[query_index]['nct_id']}
        i=0
        for idx, sim in zip(similar_indices, similar_scores):
            trial_info = {
                'nct_id': df.iloc[idx]['nct_id'],
                'Study Title': df.iloc[idx]['Study Title'],
                'Study URL': df.iloc[idx]['Study URL'],
                'Similarity': sim
            }
            results[f'Trial: {i}'] = trial_info
            i+=1

        return results
